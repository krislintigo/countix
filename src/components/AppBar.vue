<template>
  <v-app-bar class="px-6" color="primary" height="70">
    <v-row justify="space-between">
      <v-col cols="6">
        <v-app-bar-title>
          <h1 class="text-h4 mt-1">Countix</h1>
        </v-app-bar-title>
      </v-col>
      <v-col cols="3" align-self="end" class="d-flex justify-end">
        <v-menu offset-y max-width="230">
          <template v-slot:activator="{ props }">
            <v-btn icon color="white" v-bind="props">
              <v-icon>mdi-currency-eur</v-icon>
            </v-btn>
          </template>
          <ExchangeRate />
        </v-menu>
        <v-tooltip>
          <template v-slot:activator="{ props }">
            <v-btn icon class="mr-1" v-bind="props">
              <v-icon>mdi-restore</v-icon>
            </v-btn>
          </template>
          <span>Reset paid</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import ExchangeRate from '@/components/ExchangeRate';
</script>

<style scoped></style>
