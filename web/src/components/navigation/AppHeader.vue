<template>
  <v-app-bar
    elevation="0"
    class="app-bar"
  >
    <template #prepend>
      <div
        class="d-flex align-center logo-wrapper brand ml-4"
        @click="goHome"
      >
          <v-icon color="primary" size="28">
            mdi-gift-outline
          </v-icon>

          <span>хочу</span>
      </div>
    </template>

    <template #append>
      <span class="text-body-2 mr-2">{{ authStore.user?.login }}</span>
      <v-btn
        aria-label="Выйти"
        icon="mdi-logout"
        variant="text"
        :loading="authStore.isLoading"
        @click="signOut"
      />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

function goHome (): void {
  router.push('/app')
}

async function signOut (): Promise<void> {
  await authStore.logout()
  await router.push('/')
}
</script>

<style scoped>
.logo-wrapper {
  cursor: pointer;
  opacity: 0.7;
  transition: 0.2s;
}

.logo-wrapper:hover {
  opacity: 1;
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
</style>
