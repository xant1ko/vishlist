<template>
  <v-container class="d-flex align-center py-16" style="min-height: 100%">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <div class="text-center">
          <v-icon
            color="primary"
            icon="mdi-gift-outline"
            size="72"
          />
          <h1 class="text-h2 mt-6">Vishlist</h1>
          <p class="text-h6 text-medium-emphasis mt-4">
            Храните желания в одном месте и делитесь ими с близкими.
          </p>
          <v-btn
            color="primary"
            size="large"
            class="mt-8"
            to="/auth"
          >
            Начать работу
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
