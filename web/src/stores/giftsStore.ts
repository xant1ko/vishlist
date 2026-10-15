import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Gift, GiftFormData } from '../api/gifts'
import { giftsService } from '../services/giftsService'

function getErrorMessage (error: unknown): string {
  return error instanceof Error ? error.message : 'Не удалось выполнить запрос.'
}

export const useGiftsStore = defineStore('gifts', () => {
  const gifts = ref<Gift[]>([])
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function fetchGifts (): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      gifts.value = await giftsService.findAll()
    } catch (requestError) {
      error.value = getErrorMessage(requestError)
    } finally {
      isLoading.value = false
    }
  }

  async function createGift (data: GiftFormData): Promise<boolean> {
    isSaving.value = true
    error.value = null

    try {
      const gift = await giftsService.create(data)
      gifts.value.unshift(gift)
      return true
    } catch (requestError) {
      error.value = getErrorMessage(requestError)
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function updateGift (id: string, data: GiftFormData): Promise<boolean> {
    isSaving.value = true
    error.value = null

    try {
      const updatedGift = await giftsService.update(id, data)
      const giftIndex = gifts.value.findIndex(gift => gift.id === id)
      if (giftIndex !== -1) gifts.value[giftIndex] = updatedGift
      return true
    } catch (requestError) {
      error.value = getErrorMessage(requestError)
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function removeGift (id: string): Promise<boolean> {
    isSaving.value = true
    error.value = null

    try {
      await giftsService.remove(id)
      gifts.value = gifts.value.filter(gift => gift.id !== id)
      return true
    } catch (requestError) {
      error.value = getErrorMessage(requestError)
      return false
    } finally {
      isSaving.value = false
    }
  }

  function clearError (): void {
    error.value = null
  }

  return {
    gifts,
    error,
    isLoading,
    isSaving,
    fetchGifts,
    createGift,
    updateGift,
    removeGift,
    clearError,
  }
})
