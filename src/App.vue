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
    <div>
      <apexchart
        type="donut"
        width="500"
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

export default {
  name: 'App',
  components: {
    Statistics,
    BasicExpenses,
    SalaryInputs
  },
  data() {
    return {
      salary: +localStorage.getItem('salary') || 0,
      taxes: +localStorage.getItem('taxes') || 0,
      basicExpenses: JSON.parse(localStorage.getItem('basicExpenses')) || []
    }
  },
  methods: {
    updateSalary(salary) {
      this.salary = salary;
      localStorage.setItem('salary', salary);
    },
    updateTaxes(taxes) {
      if (taxes >= 0 && taxes < 100) {
        this.taxes = taxes;
        localStorage.setItem('taxes', taxes);
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
    series() {
      return this.selectedExpenses.map(expense => expense.amount)
    },
    options() {
      return {
        chart: {
          fontFamily: 'Roboto, sans-serif',
        },
        colors: ['#008FFB', '#FEB019', '#FF4560', '#775DD0', '#FD6A6A',
          '#00D9C6', '#3DDC84', '#6F0062', '#AA2407', '#74A325'],
        labels: this.selectedExpenses.map(expense => expense.name),
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                value: {
                  formatter(value) {
                    return `${value}$`;
                  }
                }
              }
            }
          }
        },
        tooltip: {
          enabled: false,
        },
        legend: {
          show: true,
        },
        title: {
          text: 'Expenses',
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
          }
        }
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
  font-family: Roboto, sans-serif;
  font-size: 24px;
}

.big-span {
  font-size: 24px;
}
</style>
