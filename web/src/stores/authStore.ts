import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AuthUser } from '../api/auth'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false)
  const user = ref<AuthUser | null>(null)
  const isLoading = ref(false)

  function startWork (): void {
    isAuth.value = true
  }

  async function login (login: string, password: string): Promise<void> {
    await authenticate(() => authService.login({ login, password }))
  }

  async function register (login: string, password: string): Promise<void> {
    await authenticate(() => authService.register({ login, password }))
  }

  async function restoreSession (): Promise<void> {
    isLoading.value = true

    try {
      user.value = await authService.getCurrentUser()
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
      await authService.logout()
    } finally {
      isAuth.value = false
      user.value = null
      isLoading.value = false
    }
  }

  async function authenticate (request: () => Promise<{ user: AuthUser }>): Promise<void> {
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
