<template>
  <v-card v-if="expense" class="mb-3 list-group-item">
    <v-card-title style="max-width: calc(100% - 150px)">
      {{ expense.name }}
    </v-card-title>
    <v-card-text :class="expense.description ? 'pb-0' : 'pb-4'">
      ${{ expense.amount }} (оплачено
      <span class="text-success" style="font-size: 16px"
        >${{ (expense.amount * expense.payed).toFixed(0) }}</span
      >)
    </v-card-text>
    <v-card-subtitle v-if="expense.description" class="pt-2 pb-4">
      {{ expense.description }}
    </v-card-subtitle>
    <v-menu close-on-content-click>
      <template v-slot:activator="{ props }">
        <v-row class="top-right" align="center">
          <v-menu location="bottom center">
            <template v-slot:activator="{ props }">
              <v-btn
                variant="text"
                density="comfortable"
                icon
                v-bind="props"
                class="mr-4"
              >
                <v-icon>mdi-currency-usd</v-icon>
              </v-btn>
            </template>
            <v-slider
              v-model="expense.payed"
              style="width: 200px"
              color="success"
              min="0"
              max="1"
              step="0.05"
              thumb-label
              hide-details
            >
              <template v-slot:thumb-label="{ modelValue }">
                <v-row style="width: 120px" justify="center">
                  Оплачено: {{ (modelValue * 100).toFixed(0) }}%
                </v-row>
              </template>
            </v-slider>
          </v-menu>
          <v-switch
            v-model="expense.considered"
            color="primary"
            density="comfortable"
            class="mr-4"
            hide-details
          />
          <v-btn icon variant="text" size="40" v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-row>
      </template>
      <v-list>
        <v-list-item>
          <v-btn variant="plain" @click="$emit('edit', expense)">
            <v-icon>mdi-pen</v-icon>
            ⁣⁣Edit
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn variant="plain" @click="remove(expense.id)">
            <v-icon>mdi-delete</v-icon>
            ⁣⁣Delete
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card>
</template>

<script setup lang="ts">
import { computed, defineProps, watchEffect } from 'vue';
import { IExpense, useExpenseStore } from '@/stores/expense.store';

const props = defineProps<{ id: number }>();

const expenseStore = useExpenseStore();

const expense = computed(() =>
  expenseStore.flatExpenses.find((expense) => expense.id === props.id)
);

const remove = (id: number) => expenseStore.deleteExpense(id);
</script>

<style scoped>
.top-right {
  position: absolute;
  top: 13px;
  right: 15px;
}
.list-group-item {
  cursor: grab;
}
.green {
  color: green;
}
</style>
