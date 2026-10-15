import type { Gift, GiftFormData } from '../api/gifts'
import { request } from './httpService'

export const giftsService = {
  create (data: GiftFormData): Promise<Gift> {
    return request<Gift>({
      url: '/gifts',
      method: 'POST',
      data,
    })
  },

  findAll (): Promise<Gift[]> {
    return request<Gift[]>({ url: '/gifts' })
  },

  remove (id: string): Promise<void> {
    return request<void>({
      url: `/gifts/${id}`,
      method: 'DELETE',
    })
  },

  updateReservation (id: string, isReserved: boolean): Promise<Gift> {
    return request<Gift>({
      url: `/gifts/${id}/reservation`,
      method: 'PATCH',
      data: { is_reserved: isReserved },
    })
  },

  update (id: string, data: GiftFormData): Promise<Gift> {
    return request<Gift>({
      url: `/gifts/${id}`,
      method: 'PATCH',
      data,
    })
  },
}
