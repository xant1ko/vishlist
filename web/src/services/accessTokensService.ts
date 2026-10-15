import type { AccessToken, SharedGifts } from '../api/accessTokens'
import { request } from './httpService'

export const accessTokensService = {
  create (): Promise<AccessToken> {
    return request<AccessToken>({
      url: '/gift-access-tokens',
      method: 'POST',
    })
  },

  getSharedGifts (token: string): Promise<SharedGifts> {
    return request<SharedGifts>({
      url: `/gift-access-tokens/${encodeURIComponent(token)}/gifts`,
    })
  },
}
