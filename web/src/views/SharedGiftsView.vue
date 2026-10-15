<template>
  <v-container class="py-6 py-md-8">
    <h1 class="text-h4 mb-8">
      Вишлист{{ sharedLogin ? ` ${sharedLogin}` : '' }}
    </h1>

    <v-alert
      v-if="error"
      type="error"
    >
      {{ error }}
    </v-alert>

    <v-row v-else-if="isLoading">
      <v-col
        v-for="index in 4"
        :key="index"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="gift in sharedGifts"
        :key="gift.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <GiftCard :gift="gift" readonly />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import GiftCard from '../components/gifts/GiftCard.vue'
import { useAccessTokensStore } from '../stores/accessTokensStore'

const route = useRoute()
const accessTokensStore = useAccessTokensStore()
const { error, isLoading, sharedGifts, sharedLogin } = storeToRefs(accessTokensStore)

onMounted(() => {
  accessTokensStore.fetchSharedGifts(String(route.params.token))
})
</script>
