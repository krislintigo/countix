<template>
  <v-app-bar color="primary" height="70">
    <v-app-bar-title>
      <h1 class="text-h4 mt-1">Countix</h1>
    </v-app-bar-title>
    <template #append>
      <BudgetDialog v-model="isBudgetDialogOpen" />
      <v-btn icon color="white" @click="isBudgetDialogOpen = true">
        <v-icon>mdi-safe</v-icon>
      </v-btn>
      <v-btn icon color="white">
        <v-icon>mdi-currency-eur</v-icon>
        <v-menu activator="parent" :close-on-content-click="false">
          <ExchangeRate />
        </v-menu>
      </v-btn>
      <v-btn icon color="white">
        <v-icon>mdi-account</v-icon>
        <v-menu activator="parent" :close-on-content-click="false">
          <UserProfile />
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ExchangeRate from '@/components/popups/ExchangeRate.vue';
import UserProfile from '@/components/popups/UserProfile.vue';
import BudgetDialog from '@/components/dialogs/BudgetDialog.vue';

const isBudgetDialogOpen = ref(false);
</script>

<style scoped></style>
