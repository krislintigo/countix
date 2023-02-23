<template>
  <v-app-bar color="primary" height="70">
    <v-app-bar-title>
      <h1 class="text-h4 mt-1">Countix</h1>
    </v-app-bar-title>
    <template #append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon color="white" v-bind="props">
            <v-icon>mdi-currency-eur</v-icon>
          </v-btn>
        </template>
        <ExchangeRate />
      </v-menu>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon color="white" v-bind="props">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <UserProfile />
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import ExchangeRate from '@/components/ExchangeRate';
import UserProfile from '@/components/UserProfile.vue';
</script>

<style scoped></style>
