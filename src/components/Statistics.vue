<template>
  <div class="container">
    <p class="stat-item">Net salary: <strong>{{netSalary}}$</strong></p>
    <p class="stat-item">Planned expenses: <strong>{{plannedExpenses}}$</strong></p>
    <p class="stat-item">Free money: <strong>{{freeMoney}}$ ({{freeMoneyPercent}}%)</strong></p>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  props: {
    netSalary: {
      type: Number,
      required: true
    },
    plannedExpenses: {
      type: Number,
      required: true
    }
  },
  computed: {
    freeMoney() {
      return +(this.netSalary - this.plannedExpenses).toFixed(1);
    },
    freeMoneyPercent() {
      return +(this.freeMoney / this.netSalary * 100).toFixed(0);
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 40px;
}

.stat-item {
  font-size: 24px;
}
</style>
