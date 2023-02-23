<template>
  <v-app>
    <AppBar />
    <v-main v-if="authStore.user" class="mt-10 pb-16">
      <v-row
        justify="space-around"
        class="flex-sm-row-reverse"
        no-gutters
        style="row-gap: 50px"
      >
        <v-col cols="12" class="v-col-lg-6">
          <v-row justify="center" no-gutters>
            <v-col cols="11" class="v-col-md-9 v-col-sm-10">
              <DonutChart />
              <ExpenseStatistics />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="v-col-lg-6">
          <v-row justify="center" no-gutters>
            <v-col cols="11" class="v-col-md-9 v-col-sm-10">
              <SalaryInputs />
              <BasicExpenses />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
    <v-main v-else>
      <v-card class="ma-8 pa-5">
        <h2 class="text-center">Пожалуйста, выполните вход в приложение!</h2>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import throttle from 'lodash/throttle';
import SalaryInputs from '@/components/SalaryInputs';
import BasicExpenses from '@/components/BasicExpenses';
import ExpenseStatistics from '@/components/ExpenseStatistics';
import DonutChart from '@/components/DonutChart';
import AppBar from '@/components/AppBar';
import { useMoneyStore } from '@/stores/money.store';
import { useFolderStore } from '@/stores/folder.store';
import { useExpenseStore } from '@/stores/expense.store';
import { useAuthStore } from '@/stores/auth.store';

window.addEventListener('error', (e) => alert(e));

const authStore = useAuthStore();
authStore.login(null);

useMoneyStore().$subscribe(throttle(authStore.push, 3000));

useFolderStore().$subscribe(throttle(authStore.push, 3000));

useExpenseStore().$subscribe(throttle(authStore.push, 3000));
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400&family=Rubik:wght@300;400&display=swap');
* {
  font-family: Rubik, Avenir, Helvetica, Arial, sans-serif !important;
}
</style>
