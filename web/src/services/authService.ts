import type { AuthCredentials, AuthResponse, AuthUser } from '../api/auth'
import { request } from './httpService'

export const authService = {
  getCurrentUser (): Promise<AuthUser> {
    return request<AuthUser>({ url: '/auth/me' })
  },

  login (credentials: AuthCredentials): Promise<AuthResponse> {
    return request<AuthResponse>({
      url: '/auth/login',
      method: 'POST',
      data: credentials,
    })
  },

  logout (): Promise<void> {
    return request<void>({
      url: '/auth/logout',
      method: 'POST',
    })
  },

  register (credentials: AuthCredentials): Promise<AuthResponse> {
    return request<AuthResponse>({
      url: '/auth/register',
      method: 'POST',
      data: credentials,
    })
  },
}
