<template>
  <v-dialog v-model="isOpen" max-width="600px">
    <v-card class="pa-3">
      <v-card-title class="text-h5">Информация о расходе</v-card-title>
      <v-col @keydown.enter="$emit('save')">
        <v-text-field
          v-model="_expense.name"
          variant="outlined"
          label="Название"
        />
        <v-text-field
          v-model.number="_expense.amount"
          type="number"
          variant="outlined"
          label="Сумма"
          prefix="$"
        />
        <v-textarea
          v-model="_expense.description"
          variant="outlined"
          label="Описание"
          rows="4"
          auto-grow
          no-resize
        />
      </v-col>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red-darken-1" variant="text" @click="isOpen = false">
          Назад
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          @click="
            $emit('save', _expense);
            isOpen = false;
          "
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { IExpenseData } from '@/stores/expense.store';

const props = defineProps<{
  modelValue: boolean;
  expense: IExpenseData;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:expense', value: IExpenseData): void;
  (e: 'save', value: IExpenseData): void;
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const _expense = computed({
  get: () => props.expense,
  set: (value) => emit('update:expense', value),
});
</script>

<style scoped></style>
