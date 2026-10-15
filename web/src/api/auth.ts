export interface AuthUser {
  id: string
  login: string
  created_at: string
  updated_at: string
}

interface AuthResponse {
  user: AuthUser
}

interface AuthCredentials {
  login: string
  password: string
}

async function request<T> (path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/v1/auth/${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null) as { message?: string | string[] } | null
    const message = Array.isArray(body?.message) ? body.message.join('. ') : body?.message
    throw new Error(message ?? 'Не удалось выполнить запрос.')
  }

  return response.status === 204 ? undefined as T : response.json() as Promise<T>
}

export function login (credentials: AuthCredentials): Promise<AuthResponse> {
  return request<AuthResponse>('login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function register (credentials: AuthCredentials): Promise<AuthResponse> {
  return request<AuthResponse>('register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function getCurrentUser (): Promise<AuthUser> {
  return request<AuthUser>('me')
}

export function logout (): Promise<void> {
  return request<void>('logout', { method: 'POST' })
}
