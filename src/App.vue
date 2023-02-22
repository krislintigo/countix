<template>
  <v-app>
    <AppBar />
    <v-main class="mt-10 mb-16">
      <v-row justify="space-around" class="flex-sm-row-reverse">
        <v-col cols="12" class="v-col-lg-6">
          <v-row justify="center">
            <v-col cols="11" class="v-col-md-9 v-col-sm-10">
              <DonutChart />
              <ExpenseStatistics />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="v-col-lg-6">
          <v-row justify="center">
            <v-col cols="11" class="v-col-md-9 v-col-sm-10">
              <SalaryInputs />
              <BasicExpenses />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SalaryInputs from '@/components/SalaryInputs';
import BasicExpenses from '@/components/BasicExpenses';
import ExpenseStatistics from '@/components/ExpenseStatistics';
import DonutChart from '@/components/DonutChart';
import AppBar from '@/components/AppBar';
import { useMoneyStore } from '@/stores/money.store';
import LocalStorageService from '@/services/localStorage.service';
import { useFolderStore } from '@/stores/folder.store';
import { useExpenseStore } from '@/stores/expense.store';

useMoneyStore().$subscribe((_, state) => {
  LocalStorageService.setItem('salary', state.salary);
  LocalStorageService.setItem('taxes', state.taxes);
});

useFolderStore().$subscribe((_, state) => {
  LocalStorageService.setObject('folders', state.folders);
});

useExpenseStore().$subscribe((_, state) => {
  const folderStore = useFolderStore();
  LocalStorageService.setObject('expenses', state.expenses);
  LocalStorageService.setObject('folders', folderStore.folders);
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400&family=Rubik:wght@300;400&display=swap');
* {
  font-family: Rubik, Avenir, Helvetica, Arial, sans-serif !important;
}
</style>
