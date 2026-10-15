<template>
  <v-menu
    v-model="isMenuOpen"
    location="left top"
    :close-on-content-click="false"
  >
    <template #activator="{ props: activator }">
      <v-btn
        v-bind="activator"
        class="fixed-btn"
        icon="mdi-menu"
      />
    </template>

    <AppNavigationList />
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNavigationList from './AppNavigationList.vue'

const isMenuOpen = ref(false)
</script>

<style scoped>
.fixed-btn {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 10;
}
</style>
