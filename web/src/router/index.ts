import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import IndexLayout from '../layouts/IndexLayout.vue'
import LandingLayout from '../layouts/LandingLayout.vue'
import { useAuthStore } from '../stores/authStore'
import AuthView from '../views/AuthView.vue'
import HomeView from '../views/HomeView.vue'
import LandingView from '../views/LandingView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LandingLayout,
      children: [
        {
          path: '',
          name: 'landing',
          component: LandingView,
        },
      ],
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'auth',
          component: AuthView,
        },
      ],
    },
    {
      path: '/app',
      component: IndexLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
      ],
    },
  ],
})

router.beforeEach(to => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuth) {
    return { name: 'auth' }
  }

  if (to.name === 'auth' && authStore.isAuth) {
    return { name: 'home' }
  }

  return true
})
