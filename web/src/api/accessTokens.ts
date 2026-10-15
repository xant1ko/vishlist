import type { Gift } from './gifts'

export interface AccessToken {
  token: string
  expires_at: string
}

export interface SharedGifts {
  login: string
  gifts: Gift[]
}
