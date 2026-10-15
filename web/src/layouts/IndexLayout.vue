<template>
  <AppBottomNav v-if="isMobileNav" />
  <AppDrawer v-else />
  <AppHeader />

  <v-main>
    <RouterView />
  </v-main>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import AppBottomNav from '../components/navigation/AppBottomNav.vue'
import AppDrawer from '../components/navigation/AppDrawer.vue'
import AppHeader from '../components/navigation/AppHeader.vue'

const { smAndDown: isMobileNav } = useDisplay()
</script>
