<template>
  <v-list nav>
    <v-list-item
      v-for="item in navigationItems"
      :key="item.id"
      :active="route.path === item.path"
      :prepend-icon="item.icon"
      :title="item.title"
      active-color="primary"
      density='compact'
      @click="router.push(item.path)"
    />
  </v-list>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

interface NavigationItem {
  icon: string
  id: string
  path: string
  title: string
}

const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    path: '/app',
    title: 'Мои желания',
    icon: 'mdi-gift-outline',
  },
]

const route = useRoute()
const router = useRouter()
</script>
