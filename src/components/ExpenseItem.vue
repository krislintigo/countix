<template>
  <v-card class="mb-3 list-group-item">
    <v-card-title>{{ expense.name }}</v-card-title>
    <v-card-text :class="expense.description ? 'pb-0' : 'pb-4'">
      ${{ expense.amount }}
    </v-card-text>
    <v-card-subtitle v-if="expense.description" class="pt-2 pb-4">
      {{ expense.description }}
    </v-card-subtitle>
    <v-col class="top-right"> </v-col>
    <v-menu close-on-content-click>
      <template v-slot:activator="{ props }">
        <v-row class="top-right" align="center">
          <v-switch
            v-model="expense.considered"
            color="primary"
            density="comfortable"
            class="mr-4"
            hide-details
          />
          <v-switch
            v-model="expense.payed"
            color="success"
            density="comfortable"
            class="mr-2"
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
import { useExpenseStore } from '@/stores/expense.store';

const props = defineProps<{ id: number }>();

const expenseStore = useExpenseStore();

const expense = computed(
  () =>
    expenseStore.flatExpenses.find((expense) => expense.id === props.id) || {}
);

const remove = (id: number) => expenseStore.deleteExpense(id);
</script>

<style scoped>
.top-right {
  position: absolute;
  top: 10px;
  right: 15px;
}
.list-group-item {
  cursor: move;
}
.green {
  color: green;
}
</style>
