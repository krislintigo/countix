<template>
  <div id="app">
    <div>
      <SalaryInputs
        :salary="salary"
        :taxes="taxes"
        @updateSalary="updateSalary"
        @updateTaxes="updateTaxes"
      />
      <BasicExpenses :basic-expenses="basicExpenses" />
    </div>
    <div class="canvas-container">
      <apexchart
        type="donut"
        width="100%"
        :options="options"
        :series="series"
      >
      </apexchart>
      <Statistics
        :net-salary="netSalary"
        :planned-expenses="plannedExpenses"
      />
    </div>
  </div>
</template>

<script>
import SalaryInputs from "@/components/SalaryInputs";
import BasicExpenses from "@/components/BasicExpenses";
import Statistics from "@/components/Statistics";
import chartData from "@/data/chartData";
import LocalStorageService from "@/services/localStorage.service";

export default {
  name: 'App',
  components: {
    Statistics,
    BasicExpenses,
    SalaryInputs
  },
  data() {
    return {
      salary: LocalStorageService.getNumber('salary'),
      taxes: LocalStorageService.getNumber('taxes'),
      basicExpenses: LocalStorageService.getArray('basicExpenses'),
    }
  },
  methods: {
    updateSalary(salary) {
      this.salary = salary
      LocalStorageService.setItem('salary', salary)
    },
    updateTaxes(taxes) {
      if (taxes >= 0 && taxes < 100) {
        this.taxes = taxes
        LocalStorageService.setItem('taxes', taxes)
      }
    }
  },
  computed: {
    netSalary() {
      return +(this.salary - this.taxes / 100 * this.salary).toFixed(1)
    },
    selectedExpenses() {
      return this.basicExpenses.filter(expense => expense.considered)
    },
    plannedExpenses() {
      return this.selectedExpenses.reduce((acc, cur) => acc + cur.amount, 0)
    },
    labels() {
      return this.selectedExpenses.map(expense => expense.name)
    },
    series() {
      return this.selectedExpenses.map(expense => expense.amount)
    },
    options() {
      return {
        labels: this.labels,
        ...chartData
      }
    }
  }
}
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
