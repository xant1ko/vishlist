<template>
  <v-container class="wishlist-page py-6 py-md-10">
    <!-- Заголовок -->
    <section class="wishlist-header mb-8 mb-md-10">
      <v-chip
        color="primary"
        variant="tonal"
        prepend-icon="mdi-gift-outline"
        class="mb-4"
      >
        Список желаний
      </v-chip>

      <h1 class="text-h4 text-md-h3 font-weight-bold mb-3">
        Вишлист{{ sharedLogin ? ` ${sharedLogin}` : '' }}
      </h1>

      <p class="text-body-1 text-medium-emphasis mb-5">
        Здесь собраны желания, которыми поделились с тобой.
        Возможно, ты найдёшь идею для отличного подарка.
      </p>

      <div
        v-if="!error && !isLoading"
        class="d-flex flex-wrap align-center ga-3"
      >
        <v-chip
          color="surface-variant"
          variant="flat"
          prepend-icon="mdi-gift"
        >
          {{ sharedGifts.length }}
          {{ giftsLabel(sharedGifts.length) }}
        </v-chip>

        <v-chip
          color="success"
          variant="tonal"
          prepend-icon="mdi-link-variant"
        >
          Общий список
        </v-chip>
      </div>
    </section>

    <!-- Ошибка -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      rounded="xl"
      border="start"
      class="mb-8"
      icon="mdi-alert-circle-outline"
    >
      <div class="font-weight-bold mb-1">
        Не удалось загрузить вишлист
      </div>

      {{ error }}
    </v-alert>

    <!-- Загрузка -->
    <v-row v-else-if="isLoading">
      <v-col
        v-for="index in 4"
        :key="index"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-skeleton-loader
          type="image, article, actions"
          class="wishlist-skeleton"
          rounded="xl"
        />
      </v-col>
    </v-row>

    <template v-else>
      <!-- Подарки -->
      <section>
        <div
          v-if="sharedGifts.length"
          class="d-flex align-center justify-space-between mb-5"
        >
          <h2 class="text-h6 font-weight-bold">
            Желания
          </h2>

          <span class="text-body-2 text-medium-emphasis">
            {{ sharedGifts.length }} в списке
          </span>
        </div>

        <v-row v-if="sharedGifts.length">
          <v-col
            v-for="gift in sharedGifts"
            :key="gift.id"
            cols="12"
            sm="6"
            lg="4"
          >
            <GiftCard
              :gift="gift"
              readonly
              can-reserve
              @reserve="openReservationModal"
            />
          </v-col>
        </v-row>

        <!-- Пустой список -->
        <v-card
          v-else
          rounded="xl"
          border
          elevation="0"
          class="empty-state pa-6 pa-md-10 text-center"
        >
          <v-avatar
            color="secondary"
            size="76"
            class="mb-5"
          >
            <v-icon
              icon="mdi-gift-outline"
              size="38"
              color="on-secondary"
            />
          </v-avatar>

          <h2 class="text-h5 font-weight-bold mb-3">
            Пока здесь пусто
          </h2>

          <p class="text-body-1 text-medium-emphasis mx-auto">
            В этом вишлисте пока нет желаний.
            Загляни сюда немного позже.
          </p>
        </v-card>
      </section>

      <!-- CTA -->
      <v-card
        rounded="xl"
        elevation="0"
        class="create-wishlist-cta mt-10 mt-md-14 pa-6 pa-md-10"
      >
        <v-row align="center" class="ga-y-5">
          <v-col cols="12" md="8">
            <v-chip
              color="primary"
              variant="tonal"
              prepend-icon="mdi-heart-outline"
              class="mb-4"
            >
              Подарки без угадываний
            </v-chip>

            <h2 class="text-h5 text-md-h4 font-weight-bold mb-3">
              Хочешь такой же вишлист?
            </h2>

            <p class="text-body-1 text-medium-emphasis mb-0">
              Собери список желаний, поделись ссылкой
              с друзьями и помоги им выбирать подарки,
              которые действительно тебе понравятся.
            </p>
          </v-col>

          <v-col
            cols="12"
            md="4"
            class="d-flex justify-md-end"
          >
            <v-btn
              to="/"
              color="primary"
              size="x-large"
              rounded="lg"
              append-icon="mdi-arrow-right"
              block
              class="cta-button"
            >
              Создать свой список
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </template>

    <GiftReservationModal
      v-model="isReservationModalOpen"
      :error-message="reservationError"
      :gift="selectedGift"
      :is-loading="isReserving"
      @confirm="reserveGift"
    />

    <!-- Подвал -->
    <footer class="page-footer mt-10 mt-md-14 pt-5">
      <div
        class="d-flex flex-column flex-sm-row align-center justify-space-between ga-3"
      >
        <div class="d-flex align-center ga-2">
          <v-icon
            icon="mdi-gift-outline"
            color="primary"
            size="22"
          />

          <span class="font-weight-bold">
            Хочу
          </span>
        </div>

        <span class="text-body-2 text-medium-emphasis text-center">
          Меньше ненужных подарков — больше радости
        </span>
      </div>
    </footer>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import type { Gift } from '../api/gifts'
import GiftCard from '../components/gifts/GiftCard.vue'
import GiftReservationModal from '../components/gifts/GiftReservationModal.vue'
import { useAccessTokensStore } from '../stores/accessTokensStore'

const route = useRoute()
const accessTokensStore = useAccessTokensStore()
const isReservationModalOpen = ref(false)
const selectedGift = ref<Gift | null>(null)

const {
  error,
  isLoading,
  isReserving,
  reservationError,
  sharedGifts,
  sharedLogin,
} = storeToRefs(accessTokensStore)

onMounted(() => {
  accessTokensStore.fetchSharedGifts(
    String(route.params.token),
  )
})

function openReservationModal (gift: Gift): void {
  accessTokensStore.clearReservationError()
  selectedGift.value = gift
  isReservationModalOpen.value = true
}

async function reserveGift (): Promise<void> {
  if (!selectedGift.value) return

  const isReserved = await accessTokensStore.reserveGift(selectedGift.value.id)
  if (isReserved) isReservationModalOpen.value = false
}

function giftsLabel(count: number): string {
  const lastTwo = count % 100
  const last = count % 10

  if (lastTwo >= 11 && lastTwo <= 14) {
    return 'желаний'
  }

  if (last === 1) {
    return 'желание'
  }

  if (last >= 2 && last <= 4) {
    return 'желания'
  }

  return 'желаний'
}
</script>

<style scoped>
.wishlist-page {
  max-width: 1200px;
  color: rgb(var(--v-theme-on-background));
}

.wishlist-header {
  max-width: 760px;
}

.wishlist-header p {
  max-width: 650px;
  line-height: 1.75;
}

.wishlist-skeleton {
  overflow: hidden;
  border: 1px solid rgb(var(--v-theme-outline-variant));
  background: rgb(var(--v-theme-surface));
}

.empty-state {
  background: rgb(var(--v-theme-surface));
}

.empty-state p {
  max-width: 460px;
  line-height: 1.7;
}

.create-wishlist-cta {
  overflow: hidden;
  border: 1px solid rgb(var(--v-theme-outline-variant));
  background: rgb(var(--v-theme-surface));
}

.create-wishlist-cta p {
  max-width: 650px;
  line-height: 1.75;
}

.cta-button {
  min-height: 52px;
}

.page-footer {
  border-top: 1px solid rgb(var(--v-theme-outline-variant));
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
