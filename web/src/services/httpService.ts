import axios, { type AxiosRequestConfig } from 'axios'

export class HttpError extends Error {
  constructor (
    message: string,
    public readonly status: number,
  ) {
    super(message)
  }
}

const httpClient = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

function getErrorMessage (data: unknown): string {
  if (!data || typeof data !== 'object' || !('message' in data)) {
    return 'Не удалось выполнить запрос.'
  }

  const { message } = data as { message?: string | string[] }
  return Array.isArray(message) ? message.join('. ') : message ?? 'Не удалось выполнить запрос.'
}

export async function request<T> (config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await httpClient.request<T>(config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new HttpError(
        getErrorMessage(error.response?.data),
        error.response?.status ?? 0,
      )
    }

    throw error
  }
}

export { httpClient }
