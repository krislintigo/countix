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
      <DescriptionItem color="brown" label="Чистый доход">
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
      <DescriptionItem color="blue-grey" label="Есть / Доступно">
        $<strong class="text-h4"> {{ available }} </strong> / $<strong
          class="text-h4"
        >
          {{ total }}
        </strong>
      </DescriptionItem>
    </v-col>
    <v-col cols="12">
      <DescriptionItem color="teal" label="Имеется / Всего">
        $<strong class="text-h4"> {{ freeMoney + available }} </strong> /
        $<strong class="text-h4">
          {{ freeMoney + total }}
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
  available,
  total,
  netSalary,
  freeMoney,
  consideredExpensesAmount,
  pendingExpensesAmount,
} = storeToRefs(moneyStore);
</script>

<style scoped></style>
