<template>
  <v-card :ripple="false" class="pa-3 pb-8" width="300">
    <v-card-title>Профиль</v-card-title>
    <div v-if="user">
      <v-card-subtitle> Добро пожаловать, {{ user }}! </v-card-subtitle>
      <v-row justify="end" class="mt-5 mx-0">
        <v-btn color="error" @click="authStore.logout">Выход</v-btn>
      </v-row>
    </div>
    <div v-else>
      <v-text-field v-model="userLogin" variant="outlined" label="Логин" />
      <v-row justify="space-between" class="mx-0">
        <v-btn color="success" @click="authStore.login(userLogin)">Вход</v-btn>
        <v-btn color="warning" @click="authStore.registration(userLogin)">
          Регистрация
        </v-btn>
      </v-row>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const userLogin = ref('');
</script>

<style scoped></style>
