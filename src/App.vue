<template>
  <v-app>
    <v-app-bar color="primary" app dark>
      <h1 class="text-h4">Countix</h1>
    </v-app-bar>
    <v-main class="mt-3">
      <v-row justify="space-around">
        <v-col cols="4">
          <SalaryInputs
            @updateSalary="updateSalary"
            @updateTaxes="updateTaxes"
          />
          <BasicExpenses/>
        </v-col>
        <v-col cols="6">
          <apex-chart
            type="donut"
            width="70%"
            :options="options"
            :series="series"
          >
          </apex-chart>
          <Statistics/>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import SalaryInputs from '@/components/SalaryInputs';
import BasicExpenses from '@/components/BasicExpenses';
import Statistics from '@/components/Statistics';
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    Statistics,
    BasicExpenses,
    SalaryInputs,
  },
  methods: {
    updateSalary(salary) {
      this.$store.dispatch('setSalary', salary);
    },
    updateTaxes(taxes) {
      if (taxes >= 0 && taxes < 100) {
        this.$store.dispatch('setTaxes', taxes);
      }
    },
  },
  computed: mapGetters([
    'salary',
    'taxes',
    'basicExpenses',
    'netSalary',
    'consideredExpenses',
    'plannedExpenses',
    'labels',
    'series',
    'options',
  ]),
};
</script>

<style>

</style>
