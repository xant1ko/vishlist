<template>
  <v-dialog
    v-model="isOpen"
    max-width="560"
  >
    <v-card rounded="lg">
      <v-card-title class="pa-6 pb-2">Поделиться вишлистом</v-card-title>

      <v-card-text class="pa-6">
        <p class="text-body-1 text-medium-emphasis">
          Отправьте эту ссылку близким — они смогут посмотреть ваши желания.
          Ссылка действует до {{ expiresAt }}.
        </p>

        <v-alert
          v-if="errorMessage"
          type="error"
          class="mt-4"
        >
          {{ errorMessage }}
        </v-alert>

        <v-text-field
          v-else
          :model-value="shareLink"
          class="mt-4"
          hide-details
          label="Ссылка на вишлист"
          readonly
        />

        <a
          v-if="shareLink"
          :href="shareLink"
          target="_blank"
          rel="noopener noreferrer"
          class="d-inline-block mt-3 text-body-2"
        >
          Открыть страницу вишлиста
        </a>
      </v-card-text>

      <v-card-actions class="px-6 pb-6">
        <v-spacer />
        <v-btn @click="isOpen = false">Закрыть</v-btn>
        <v-btn
          color="primary"
          prepend-icon="mdi-content-copy"
          :disabled="!shareLink"
          @click="copyLink"
        >
          {{ isCopied ? 'Скопировано' : 'Скопировать ссылку' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  shareLink: string
  expiresAt: string
  errorMessage: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isCopied = ref(false)

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

async function copyLink (): Promise<void> {
  await navigator.clipboard.writeText(props.shareLink)
  isCopied.value = true
}

watch(isOpen, open => {
  if (!open) isCopied.value = false
})
</script>
