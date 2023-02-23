<template>
  <v-row class="mt-10 pa-2">
    <v-col cols="12" class="v-col-sm-6">
      <DescriptionItem color="brown" label="Чистый доход">
        $<strong class="text-h4">{{ netSalary }}</strong>
      </DescriptionItem>
    </v-col>
    <v-col cols="12" class="v-col-sm-6">
      <DescriptionItem color="primary" label="Запланировано">
        $<strong class="text-h4">
          {{ plannedExpensesAmount }}
        </strong>
      </DescriptionItem>
    </v-col>
    <v-col cols="12" class="v-col-sm-6">
      <DescriptionItem color="warning" label="Не оплачено">
        $<strong class="text-h4">
          {{ pendingExpensesAmount }}
        </strong>
      </DescriptionItem>
    </v-col>
    <v-col cols="12" class="v-col-sm-6">
      <DescriptionItem color="success" label="Свободно">
        $<strong class="text-h4">
          {{ freeMoney }} ({{ freeMoneyPercent }}%)
        </strong>
      </DescriptionItem>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useMoneyStore } from '@/stores/money.store';
import { storeToRefs } from 'pinia';
import DescriptionItem from '@/components/DescriptionItem.vue';

const moneyStore = useMoneyStore();

const {
  netSalary,
  freeMoney,
  freeMoneyPercent,
  plannedExpensesAmount,
  pendingExpensesAmount,
} = storeToRefs(moneyStore);
</script>

<style scoped></style>
