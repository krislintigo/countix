<template>
  <v-app>
    <AppBar />
    <v-main class="mt-3">
      <v-row justify="space-around">
        <v-col cols="4">
          <SalaryInputs />
          <BasicExpenses/>
        </v-col>
        <v-col cols="5">
          <DonutChart />
          <ExpenseStatistics />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import SalaryInputs from '@/components/SalaryInputs';
import BasicExpenses from '@/components/BasicExpenses';
import ExpenseStatistics from "@/components/ExpenseStatistics";
import DonutChart from "@/components/DonutChart";
import AppBar from "@/components/AppBar";

export default {
  name: 'App',
  components: {
    AppBar,
    DonutChart,
    ExpenseStatistics,
    BasicExpenses,
    SalaryInputs,
  },
};
</script>

<style>

</style>
