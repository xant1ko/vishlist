import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AccessToken } from '../api/accessTokens'
import type { Gift } from '../api/gifts'
import { accessTokensService } from '../services/accessTokensService'

function getErrorMessage (error: unknown): string {
  return error instanceof Error ? error.message : 'Не удалось выполнить запрос.'
}

export const useAccessTokensStore = defineStore('accessTokens', () => {
  const error = ref<string | null>(null)
  const isLoading = ref(false)
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

  function clearError (): void {
    error.value = null
  }

  return {
    error,
    isLoading,
    sharedLogin,
    sharedGifts,
    token,
    createToken,
    fetchSharedGifts,
    clearError,
  }
})
