<template>
  <v-app-bar class="px-8" color="primary" height="70">
    <v-row justify="space-between">
      <v-col cols="6">
        <v-app-bar-title>
          <h1 class="text-h4 mt-1">Countix</h1>
        </v-app-bar-title>
      </v-col>
      <v-col cols="3" align-self="end" class="d-flex justify-end">
        <v-menu max-width="250">
          <template v-slot:activator="{ props }">
            <v-btn icon color="white" v-bind="props">
              <v-icon>mdi-currency-eur</v-icon>
            </v-btn>
          </template>
          <ExchangeRate />
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon color="white" v-bind="props" class="ml-3">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <UserProfile />
        </v-menu>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import ExchangeRate from '@/components/ExchangeRate';
import UserProfile from '@/components/UserProfile.vue';
</script>

<style scoped></style>
