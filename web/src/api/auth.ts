export interface AuthUser {
  id: string
  login: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: AuthUser
}

export interface AuthCredentials {
  login: string
  password: string
}
