<template>
  <v-card
    rounded="lg"
    border
    elevation="0"
    class="wishlist-item-card"
  >
    <v-card-text class="pa-4">
      <div class="d-flex align-start ga-3">
        <v-avatar
          color="secondary"
          rounded="lg"
          size="48"
        >
          <v-icon
            icon="mdi-gift-outline"
            size="24"
            color="on-secondary"
          />
        </v-avatar>

        <div class="flex-grow-1 min-width-0">
          <div class="d-flex align-center ga-1">
            <div class="text-subtitle-1 font-weight-bold text-high-emphasis">
              {{ gift.name }}
            </div>
            <v-btn
              aria-label="Редактировать желание"
              icon="mdi-pencil-outline"
              size="x-small"
              variant="text"
              @click="emit('edit', gift)"
            />
          </div>

          <div
            v-if="gift.description"
            class="text-body-2 text-medium-emphasis mt-1"
          >
            {{ gift.description }}
          </div>
        </div>
      </div>

      <v-divider
        v-if="gift.links.length"
        class="my-4"
      />

      <div
        v-if="gift.links.length"
        class="d-flex flex-wrap ga-2"
      >
        <v-btn
          v-for="(link, index) in gift.links"
          :key="link"
          :href="getSafeUrl(link)"
          target="_blank"
          rel="noopener noreferrer"
          variant="tonal"
          color="primary"
          rounded="lg"
          size="small"
          prepend-icon="mdi-open-in-new"
          :disabled="!getSafeUrl(link)"
        >
          {{ gift.links.length > 1 ? `Ссылка ${index + 1}` : 'Открыть товар' }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Gift } from '../../api/gifts'

defineProps<{
  gift: Gift
}>()

const emit = defineEmits<{
  edit: [gift: Gift]
}>()

function getSafeUrl (value: string): string | undefined {
  try {
    const url = new URL(value)

    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return undefined
    }

    return url.href
  } catch {
    return undefined
  }
}
</script>

<style scoped>
.wishlist-item-card {
  background: rgb(var(--v-theme-surface));
  transition: border-color 180ms ease;
}

.wishlist-item-card:hover {
  border-color: rgb(var(--v-theme-primary));
}

.min-width-0 {
  min-width: 0;
}
</style>
