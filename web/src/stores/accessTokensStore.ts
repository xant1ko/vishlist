import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AccessToken } from '../api/accessTokens'
import type { Gift } from '../api/gifts'
import { accessTokensService } from '../services/accessTokensService'
import { giftsService } from '../services/giftsService'
import { HttpError } from '../services/httpService'

function getErrorMessage (error: unknown): string {
  return error instanceof Error ? error.message : 'Не удалось выполнить запрос.'
}

export const useAccessTokensStore = defineStore('accessTokens', () => {
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  const isReserving = ref(false)
  const reservationError = ref<string | null>(null)
  const sharedLogin = ref<string | null>(null)
  const sharedGifts = ref<Gift[]>([])
  const token = ref<AccessToken | null>(null)

  async function createToken (): Promise<AccessToken | null> {
    isLoading.value = true
    error.value = null

    try {
      token.value = await accessTokensService.create()
      return token.value
    } catch (requestError) {
      error.value = getErrorMessage(requestError)
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchSharedGifts (accessToken: string): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const response = await accessTokensService.getSharedGifts(accessToken)
      sharedLogin.value = response.login
      sharedGifts.value = response.gifts
    } catch (requestError) {
      error.value = getErrorMessage(requestError)
      sharedLogin.value = null
      sharedGifts.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function reserveGift (id: string): Promise<boolean> {
    isReserving.value = true
    reservationError.value = null

    try {
      const reservedGift = await giftsService.updateReservation(id, true)
      const giftIndex = sharedGifts.value.findIndex(gift => gift.id === id)
      if (giftIndex !== -1) sharedGifts.value[giftIndex] = reservedGift
      return true
    } catch (requestError) {
      reservationError.value = requestError instanceof HttpError
        && requestError.status === 409
        && requestError.message === 'A visitor cannot reserve more than 3 gifts'
        ? 'Вы уже забронировали 3 подарка. Больше забронировать нельзя.'
        : getErrorMessage(requestError)
      return false
    } finally {
      isReserving.value = false
    }
  }

  function clearError (): void {
    error.value = null
  }

  function clearReservationError (): void {
    reservationError.value = null
  }

  return {
    error,
    isLoading,
    isReserving,
    reservationError,
    sharedLogin,
    sharedGifts,
    token,
    createToken,
    fetchSharedGifts,
    reserveGift,
    clearError,
    clearReservationError,
  }
})
