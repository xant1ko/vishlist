<template>
  <div class="landing">
      <!-- Header -->
      <v-container class="py-4">
        <v-row align="center" justify="space-between">
          <v-col cols="auto">
            <RouterLink to="/" class="brand">
              <v-icon color="primary" size="28">
                mdi-gift-outline
              </v-icon>

              <span>хочу</span>
            </RouterLink>
          </v-col>

          <v-col cols="auto" class="d-flex align-center ga-2">
            <v-btn
              variant="text"
              color="on-surface"
              class="d-none d-sm-flex"
              href="#how-it-works"
            >
              Как это работает
            </v-btn>

            <v-btn
              color="primary"
              rounded="lg"
              to="/auth"
            >
              Создать список
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- Hero -->
      <v-container class="hero-section py-12 py-md-16">
        <v-row align="center" class="hero-row">
          <v-col cols="12" md="6">
            <v-chip
              color="primary"
              variant="tonal"
              class="mb-6"
              prepend-icon="mdi-heart-outline"
            >
              Подарки без угадываний
            </v-chip>

            <h1 class="hero-title mb-6">
              Не намекай.
              <br />
              <span class="text-primary">
                Просто добавь
              </span>
              <br />
              в список.
            </h1>

            <p class="hero-description mb-8">
              Собери желания в одном месте и поделись
              списком с друзьями. Пусть дарят то, что
              действительно хочется.
            </p>

            <div class="d-flex flex-wrap ga-3 mb-5">
              <v-btn
                color="primary"
                size="x-large"
                rounded="lg"
                append-icon="mdi-arrow-right"
                to="/auth"
              >
                Собрать вишлист
              </v-btn>

              <v-btn
                variant="outlined"
                color="on-surface"
                size="x-large"
                rounded="lg"
                prepend-icon="mdi-play-circle-outline"
                href="#how-it-works"
              >
                Как это работает
              </v-btn>
            </div>

            <div class="d-flex align-center ga-2 text-medium-emphasis">
              <v-icon color="success" size="small">
                mdi-check-circle-outline
              </v-icon>

              <span class="text-body-2">
                Просто, удобно и без неловких намёков
              </span>
            </div>
          </v-col>

          <!-- Wishlist preview -->
          <v-col cols="12" md="6">
            <div class="hero-preview pa-3 pa-sm-6">
              <v-card
                class="wishlist-card mx-auto"
                max-width="440"
                rounded="xl"
                border
              >
                <v-card-text class="pa-5 pa-sm-6">
                  <div
                    class="d-flex align-center justify-space-between mb-6"
                  >
                    <div>
                      <div class="text-overline text-medium-emphasis">
                        МОЙ ВИШЛИСТ
                      </div>

                      <h2 class="text-h5 font-weight-bold mt-1">
                        На день рождения 🎂
                      </h2>
                    </div>

                    <v-avatar
                      color="secondary"
                      size="48"
                    >
                      <v-icon color="on-secondary" size="28">
                        mdi-gift-outline
                      </v-icon>
                    </v-avatar>
                  </div>

                  <div class="d-flex align-center ga-2 mb-5">
                    <v-avatar color="surface-variant" size="32">
                      <v-icon size="18">
                        mdi-account
                      </v-icon>
                    </v-avatar>

                    <span class="text-body-2">
                      Список Саши
                    </span>

                    <v-spacer />

                    <v-chip
                      color="success"
                      variant="tonal"
                      size="small"
                    >
                      3 желания
                    </v-chip>
                  </div>

                  <v-divider class="mb-4" />

                  <v-list class="pa-0" bg-color="transparent">
                    <v-list-item
                      v-for="item in wishes"
                      :key="item.title"
                      class="wish-item mb-3 px-3"
                      rounded="lg"
                    >
                      <template #prepend>
                        <v-avatar
                          :color="item.color"
                          rounded="lg"
                          size="56"
                        >
                          <v-icon size="28" color="on-surface">
                            {{ item.icon }}
                          </v-icon>
                        </v-avatar>
                      </template>

                      <v-list-item-title class="font-weight-medium">
                        {{ item.title }}
                      </v-list-item-title>

                      <v-list-item-subtitle class="mt-1">
                        {{ item.description }}
                      </v-list-item-subtitle>

                      <template #append>
                        <v-icon color="primary" size="20">
                          mdi-heart-outline
                        </v-icon>
                      </template>
                    </v-list-item>
                  </v-list>

                  <v-btn
                    block
                    color="primary"
                    variant="tonal"
                    rounded="lg"
                    prepend-icon="mdi-link-variant"
                    class="mt-3"
                  >
                    Поделиться списком
                  </v-btn>

                  <div
                    class="text-center text-caption text-medium-emphasis mt-4"
                  >
                    Один список — и все знают, что дарить
                  </div>
                </v-card-text>
              </v-card>

              <div class="floating-note note-top">
                <v-icon color="success" class="mr-2">
                  mdi-check-circle
                </v-icon>
                Именно то, что хотел!
              </div>

              <div class="floating-note note-bottom">
                <v-icon color="primary" class="mr-2">
                  mdi-heart
                </v-icon>
                Больше никаких ненужных подарков
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Benefits -->
      <v-container class="py-12 py-md-16">
        <div class="section-heading text-center mx-auto mb-10">
          <div class="text-overline text-primary mb-2">
            ЗАЧЕМ ЭТО НУЖНО
          </div>

          <h2 class="text-h4 text-sm-h3 font-weight-bold mb-4">
            Подарки должны радовать
          </h2>

          <p class="text-body-1 text-medium-emphasis">
            Меньше догадок, больше приятных моментов.
            Имениннику — желанные подарки, друзьям — уверенность
            в своём выборе.
          </p>
        </div>

        <v-row>
          <v-col
            v-for="benefit in benefits"
            :key="benefit.title"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              class="benefit-card pa-5 h-100"
              rounded="xl"
              border
            >
              <v-avatar
                :color="benefit.color"
                rounded="lg"
                size="56"
                class="mb-5"
              >
                <v-icon size="28" color="on-surface">
                  {{ benefit.icon }}
                </v-icon>
              </v-avatar>

              <h3 class="text-h6 font-weight-bold mb-3">
                {{ benefit.title }}
              </h3>

              <p class="text-body-2 text-medium-emphasis">
                {{ benefit.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- How it works -->
      <v-container id="how-it-works" class="py-12 py-md-16">
        <div class="section-heading text-center mx-auto mb-10">
          <div class="text-overline text-primary mb-2">
            ВСЁ ПРОСТО
          </div>

          <h2 class="text-h4 text-sm-h3 font-weight-bold mb-4">
            Три шага до идеального подарка
          </h2>

          <p class="text-body-1 text-medium-emphasis">
            Не нужно ничего объяснять и отправлять десятки ссылок.
          </p>
        </div>

        <v-row>
          <v-col
            v-for="step in steps"
            :key="step.number"
            cols="12"
            md="4"
          >
            <div class="step-card pa-5">
              <div class="step-number mb-5">
                {{ step.number }}
              </div>

              <h3 class="text-h6 font-weight-bold mb-3">
                {{ step.title }}
              </h3>

              <p class="text-body-2 text-medium-emphasis">
                {{ step.description }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Final CTA -->
      <v-container id="create" class="pb-12 pb-md-16">
        <v-card
          color="primary"
          rounded="xl"
          class="cta-card pa-6 pa-sm-10 pa-md-14"
        >
          <v-row align="center">
            <v-col cols="12" md="8">
              <div class="text-overline mb-3 cta-muted">
                ТВОИ ЖЕЛАНИЯ — ТВОИ ПРАВИЛА
              </div>

              <h2 class="text-h4 text-sm-h3 font-weight-bold mb-4">
                А что хочешь ты?
              </h2>

              <p class="text-body-1 cta-muted">
                Начни собирать список уже сейчас.
                Пусть близкие знают, чем тебя порадовать.
              </p>
            </v-col>

            <v-col cols="12" md="4" class="text-md-right">
              <v-btn
                color="surface"
                variant="flat"
                size="x-large"
                rounded="lg"
                append-icon="mdi-arrow-right"
                to="/auth"
              >
                Создать вишлист
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <!-- Footer -->
      <v-divider />

      <v-container class="py-6">
        <div
          class="d-flex flex-column flex-sm-row align-center justify-space-between ga-3"
        >
          <RouterLink to="/" class="brand">
            <v-icon color="primary" size="22">
              mdi-gift-outline
            </v-icon>

            <span>хочу</span>
          </RouterLink>

          <span class="text-body-2 text-medium-emphasis text-center">
            Сделано для тех, кто любит дарить и получать
          </span>

          <span class="text-caption text-medium-emphasis">
            © 2026 Хочу
          </span>
        </div>
      </v-container>
  </div>
</template>

<script setup lang="ts">
const wishes = [
  {
    title: 'Наушники',
    description: 'Хорошие, с шумоподавлением',
    icon: 'mdi-headphones',
    color: '#F2C078',
  },
  {
    title: 'Книга',
    description: 'Что-нибудь про дизайн',
    icon: 'mdi-book-open-page-variant',
    color: '#DCC9EB',
  },
  {
    title: 'Сертификат',
    description: 'В любимый магазин',
    icon: 'mdi-card-giftcard',
    color: '#C9E2D0',
  },
]

const benefits = [
  {
    title: 'Желанные подарки',
    description:
      'Добавляй конкретные вещи, впечатления и идеи. Близкие будут знать, что действительно тебя порадует.',
    icon: 'mdi-heart-outline',
    color: '#F2C078',
  },
  {
    title: 'Одна ссылка для всех',
    description:
      'Поделись списком с друзьями и родственниками. Не нужно каждому отдельно объяснять свои желания.',
    icon: 'mdi-link-variant',
    color: '#DCC9EB',
  },
  {
    title: 'Никаких неловких намёков',
    description:
      'Не придётся отвечать на вопрос «Что тебе подарить?» в десятый раз или делать вид, что тебе всё понравилось.',
    icon: 'mdi-party-popper',
    color: '#C9E2D0',
  },
]

const steps = [
  {
    number: '01',
    title: 'Добавь желания',
    description:
      'Собери всё, что хочется получить: от маленьких приятностей до подарка мечты.',
  },
  {
    number: '02',
    title: 'Поделись ссылкой',
    description:
      'Отправь свой список друзьям, близким или коллегам перед праздником.',
  },
  {
    number: '03',
    title: 'Получай то, что хочешь',
    description:
      'Близким проще выбрать подарок, а тебе приятнее получать именно то, о чём мечтал.',
  },
]
</script>

<style scoped>
.landing {
  background: rgb(var(--v-theme-background));
  color: rgb(var(--v-theme-on-background));
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgb(var(--v-theme-on-background));
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -1px;
  text-decoration: none;
}

.hero-row {
  min-height: 540px;
}

.hero-title {
  font-size: clamp(2.8rem, 5.5vw, 4.8rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.055em;
}

.hero-description {
  max-width: 500px;
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgb(var(--v-theme-on-surface-variant));
}

.hero-preview {
  position: relative;
  border-radius: 28px;
  background: rgb(var(--v-theme-surface-light));
}

.wishlist-card {
  position: relative;
  z-index: 1;
}

.wish-item {
  background: rgb(var(--v-theme-background));
}

.floating-note {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  border: 1px solid rgb(var(--v-theme-outline-variant));
  border-radius: 14px;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 8px 28px rgb(53 43 40 / 8%);
  font-size: 0.8rem;
  font-weight: 600;
}

.note-top {
  top: 7%;
  right: -2%;
}

.note-bottom {
  bottom: 7%;
  left: -4%;
}

.section-heading {
  max-width: 660px;
}

.benefit-card {
  background: rgb(var(--v-theme-surface));
  transition:
    transform 180ms ease,
    border-color 180ms ease;
}

.benefit-card:hover {
  transform: translateY(-4px);
  border-color: rgb(var(--v-theme-primary));
}

.step-card {
  height: 100%;
  border-radius: 16px;
  background: rgb(var(--v-theme-surface));
}

.step-number {
  display: flex;
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-on-secondary));
  font-size: 1.1rem;
  font-weight: 800;
}

.cta-card {
  color: rgb(var(--v-theme-on-primary));
}

.cta-muted {
  opacity: 0.88;
}

@media (max-width: 600px) {
  .hero-row {
    min-height: auto;
  }

  .hero-title {
    font-size: 2.75rem;
  }

  .floating-note {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .benefit-card {
    transition: none;
  }

  .benefit-card:hover {
    transform: none;
  }
}
</style>
