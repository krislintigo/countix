<template>
  <v-row class="mt-6 pa-2">
    <v-col cols="12">
      <DescriptionItem color="white" label="Зарплата / Налоги">
        $<strong class="text-h4">{{ salary }}</strong> / $<strong
          class="text-h4"
        >
          {{ salary - netSalary }}
        </strong>
      </DescriptionItem>
    </v-col>
    <v-col cols="12" class="v-col-sm-6">
      <DescriptionItem color="red" label="Чистый доход">
        $<strong class="text-h4">{{ netSalary }}</strong>
      </DescriptionItem>
    </v-col>
    <v-col cols="12" class="v-col-sm-6">
      <DescriptionItem color="primary" label="Запланировано">
        $<strong class="text-h4">
          {{ consideredExpensesAmount }}
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
          {{ freeMoney }} ({{ ((freeMoney / netSalary) * 100).toFixed(0) }}%)
        </strong>
      </DescriptionItem>
    </v-col>
    <v-col cols="12">
      <DescriptionItem color="white" label="У меня есть / Доступно">
        $<strong class="text-h4"> {{ inStock }} </strong> / $<strong
          class="text-h4"
        >
          {{ available }}
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
  salary,
  inStock,
  available,
  netSalary,
  freeMoney,
  consideredExpensesAmount,
  pendingExpensesAmount,
} = storeToRefs(moneyStore);
</script>

<style scoped></style>
