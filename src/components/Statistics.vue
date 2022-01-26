<template>
  <div class="container">
    <p class="stat-item">Net salary: <strong>{{netSalary}}$</strong></p>
    <p class="stat-item">Planned expenses: <strong>{{plannedExpenses}}$</strong></p>
    <p class="stat-item">Free money: <strong>{{freeMoney}}$ ({{freeMoneyPercent}}%)</strong></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Statistics',
  computed: mapGetters([
    'netSalary',
    'plannedExpenses',
    'freeMoney',
    'freeMoneyPercent',
  ]),
};
</script>

<style scoped>
.container {
  margin-top: 40px;
}

.stat-item {
  font-size: 24px;
}
</style>
