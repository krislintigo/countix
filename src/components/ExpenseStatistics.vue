<template>
  <div class="mt-10 pa-2">
    <p class="text-h5">
      Чистый доход: &nbsp;$<strong class="text-h4">{{ netSalary }}</strong>
    </p>
    <p class="text-h5 mt-1">
      Запланированные расходы: &nbsp;$<strong class="text-h4">
        {{ plannedExpensesAmount }}
      </strong>
    </p>
    <p class="text-h5 mt-2">
      Свободные деньги: &nbsp;$<strong class="text-h4">
        {{ freeMoney }} ({{ freeMoneyPercent }}%)
      </strong>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMoneyStore } from '@/stores/money.store';
import { storeToRefs } from 'pinia';

const moneyStore = useMoneyStore();

const { netSalary, freeMoney, freeMoneyPercent, plannedExpensesAmount } =
  storeToRefs(moneyStore);
</script>

<style scoped></style>
