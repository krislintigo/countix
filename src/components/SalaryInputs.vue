<template>
  <v-col class="d-flex flex-column pb-0">
    <v-text-field
      v-model.number="salary"
      type="number"
      min="0"
      variant="outlined"
      label="Зарплата"
      prefix="$"
    />
    <v-text-field
      v-model.number="taxes"
      type="number"
      min="0"
      variant="outlined"
      label="Налоги"
      prefix="%"
    />
  </v-col>
</template>

<script setup lang="ts">
import { useMoneyStore } from '@/stores/money.store';
import { computed } from 'vue';

const moneyStore = useMoneyStore();

const salary = computed({
  get: () => moneyStore.salary,
  set: (value) => moneyStore.setSalary(value),
});

const taxes = computed({
  get: () => moneyStore.taxes,
  set: (value) => moneyStore.setTaxes(value),
});
</script>

<style scoped></style>
