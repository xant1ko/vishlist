import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as authApi from '../api/auth'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false)
  const user = ref<authApi.AuthUser | null>(null)
  const isLoading = ref(false)

  function startWork (): void {
    isAuth.value = true
  }

  async function login (login: string, password: string): Promise<void> {
    await authenticate(() => authApi.login({ login, password }))
  }

  async function register (login: string, password: string): Promise<void> {
    await authenticate(() => authApi.register({ login, password }))
  }

  async function restoreSession (): Promise<void> {
    isLoading.value = true

    try {
      user.value = await authApi.getCurrentUser()
      isAuth.value = true
    } catch {
      isAuth.value = false
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  async function logout (): Promise<void> {
    isLoading.value = true

    try {
      await authApi.logout()
    } finally {
      isAuth.value = false
      user.value = null
      isLoading.value = false
    }
  }

  async function authenticate (request: () => Promise<{ user: authApi.AuthUser }>): Promise<void> {
    isLoading.value = true

    try {
      const response = await request()
      user.value = response.user
      startWork()
    } finally {
      isLoading.value = false
    }
  }

  return {
    isAuth,
    user,
    isLoading,
    startWork,
    login,
    register,
    restoreSession,
    logout,
  }
}, {
  persist: {
    pick: ['isAuth', 'user'],
  },
})
