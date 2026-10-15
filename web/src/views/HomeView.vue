<template>
  <v-container class="py-6 py-md-8">
    <div class="d-flex flex-wrap align-center justify-space-between ga-4 mb-8">
      <h1 class="text-h4">Мои желания</h1>

      <div class="d-flex flex-wrap ga-2">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="openCreateModal"
        >
          Добавить
        </v-btn>
        <v-btn
          prepend-icon="mdi-share-variant-outline"
          variant="outlined"
        >
          Поделиться
        </v-btn>
      </div>
    </div>

    <v-alert
      v-if="error"
      closable
      type="error"
      class="mb-6"
      @click:close="giftsStore.clearError()"
    >
      {{ error }}
    </v-alert>

    <v-row v-if="isLoading">
      <v-col
        v-for="index in 4"
        :key="index"
        cols="12"
        sm="6"
        lg="4"
        xl="3"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="gift in gifts"
        :key="gift.id"
        cols="12"
        sm="6"
        lg="4"
        xl="3"
      >
        <GiftCard
          :gift="gift"
          @edit="openEditModal"
        />
      </v-col>
    </v-row>

    <GiftFormModal
      v-model="isGiftModalOpen"
      :error-message="error"
      :gift="editedGift"
      :is-saving="isSaving"
      @remove="removeGift"
      @save="saveGift"
    />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Gift, GiftFormData } from '../api/gifts'
import GiftCard from '../components/gifts/GiftCard.vue'
import GiftFormModal from '../components/gifts/GiftFormModal.vue'
import { useGiftsStore } from '../stores/giftsStore'

const giftsStore = useGiftsStore()

const isGiftModalOpen = ref(false)
const editedGift = ref<Gift | null>(null)

const { error, gifts, isLoading, isSaving } = storeToRefs(giftsStore)

function openCreateModal (): void {
  giftsStore.clearError()
  editedGift.value = null
  isGiftModalOpen.value = true
}

function openEditModal (gift: Gift): void {
  giftsStore.clearError()
  editedGift.value = gift
  isGiftModalOpen.value = true
}

async function saveGift (data: GiftFormData): Promise<void> {
  const isSaved = editedGift.value
    ? await giftsStore.updateGift(editedGift.value.id, data)
    : await giftsStore.createGift(data)

  if (isSaved) isGiftModalOpen.value = false
}

async function removeGift (): Promise<void> {
  if (!editedGift.value) return

  const isRemoved = await giftsStore.removeGift(editedGift.value.id)
  if (isRemoved) isGiftModalOpen.value = false
}

onMounted(() => {
  giftsStore.fetchGifts()
})
</script>
