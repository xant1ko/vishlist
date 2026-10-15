<template>
  <v-dialog
    v-model="isOpen"
    max-width="460"
  >
    <v-card rounded="lg">
      <v-card-title class="pa-6 pb-2">Забронировать подарок?</v-card-title>
      <v-card-text class="px-6 pt-4">
        <p class="text-body-1">
          Точно хотите забронировать «{{ gift?.name }}»?
        </p>
        <p class="text-body-2 text-medium-emphasis mt-2">
          Другие гости увидят, что этот подарок уже выбран.
        </p>
        <v-alert
          v-if="errorMessage"
          type="error"
          class="mt-4"
        >
          {{ errorMessage }}
        </v-alert>
      </v-card-text>
      <v-card-actions class="px-6 pb-6">
        <v-spacer />
        <v-btn :disabled="isLoading" @click="isOpen = false">Отмена</v-btn>
        <v-btn
          color="primary"
          :loading="isLoading"
          @click="emit('confirm')"
        >
          Забронировать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Gift } from '../../api/gifts'

const props = defineProps<{
  modelValue: boolean
  gift: Gift | null
  isLoading: boolean
  errorMessage: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>
