<template>
  <v-container class="d-flex align-center py-16" style="min-height: 100%">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="pa-6">
          <h1 class="text-h5">{{ isRegistration ? 'Регистрация' : 'Авторизация' }}</h1>
          <v-form class="mt-6 d-flex flex-column ga-3" @submit.prevent="submit">
            <v-text-field
              v-model.trim="login"
              label="Логин"
              autocomplete="username"
              :disabled="authStore.isLoading"
              :error-messages="errorMessage"
            />
            <v-text-field
              v-model="password"
              label="Пароль"
              type="password"
              autocomplete="current-password"
              :disabled="authStore.isLoading"
              hint="От 8 до 128 символов"
            />
            <v-btn
              block
              color="primary"
              type="submit"
              :loading="authStore.isLoading"
            >
              {{ isRegistration ? 'Зарегистрироваться' : 'Войти' }}
            </v-btn>
          </v-form>
          <v-btn
            block
            variant="text"
            class="mt-3"
            :disabled="authStore.isLoading"
            @click="toggleMode"
          >
            {{ isRegistration ? 'У меня уже есть аккаунт' : 'Создать аккаунт' }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const login = ref('')
const password = ref('')
const isRegistration = ref(false)
const errorMessage = ref('')

async function submit (): Promise<void> {
  errorMessage.value = ''

  try {
    if (isRegistration.value) {
      await authStore.register(login.value, password.value)
    } else {
      await authStore.login(login.value, password.value)
    }
    await router.push('/app')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Не удалось выполнить авторизацию.'
  }
}

function toggleMode (): void {
  isRegistration.value = !isRegistration.value
  errorMessage.value = ''
}
</script>
