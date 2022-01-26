<template>
  <div id="app">
    <div>
      <SalaryInputs
        @updateSalary="updateSalary"
        @updateTaxes="updateTaxes"
      />
      <BasicExpenses />
    </div>
    <div class="canvas-container">
      <apex-chart
        type="donut"
        width="100%"
        :options="options"
        :series="series"
      >
      </apex-chart>
      <Statistics />
    </div>
  </div>
</template>

<script>
import SalaryInputs from '@/components/SalaryInputs';
import BasicExpenses from '@/components/BasicExpenses';
import Statistics from '@/components/Statistics';
import { mapGetters } from "vuex";

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
#app {
  display: flex;
  justify-content: space-evenly;
  font-family: Roboto, sans-serif;
}

input {
  margin-bottom: 10px;
  width: 200px;
  font-family: inherit;
  font-size: 24px;
}

button {
  border: 0;
  cursor: pointer;
}

.canvas-container {
  width: 550px;
}

.big-span {
  font-size: 24px;
}

@media (max-width: 1000px) {
  #app {
    flex-direction: column;
    align-items: center;
  }

  .canvas-container {
    width: 100%;
  }
}
</style>
