<template>
  <div class="mt-10">
    <p class="text-h5">Net salary: <strong class="text-h4">{{netSalary}}$</strong></p>
    <p class="text-h5">Planned expenses: <strong class="text-h4">{{plannedExpenses}}$</strong></p>
    <p class="text-h5">Free money: <strong class="text-h4">{{freeMoney}}$ ({{freeMoneyPercent}}%)</strong></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ExpenseStatistics',
  computed: mapGetters([
    'netSalary',
    'plannedExpenses',
    'freeMoney',
    'freeMoneyPercent',
  ]),
};
</script>

<style scoped>

</style>
