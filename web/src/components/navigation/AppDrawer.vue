<template>
  <v-navigation-drawer
    permanent
    width="300"
    :rail="isDrawerRail"
  >
    <div class="d-flex flex-column fill-height">
      <AppNavigationList />

      <v-spacer />

      <div class="pa-2">
<v-divider/>
        <v-btn
          :aria-label="isDrawerRail ? 'Раскрыть навигацию' : 'Свернуть навигацию'"
          :icon="isDrawerRail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          block
          rounded
          size="small"
          variant="text"
          @click="isDrawerRail = !isDrawerRail"
        />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNavigationList from './AppNavigationList.vue'

const isDrawerRail = ref(false)
</script>
