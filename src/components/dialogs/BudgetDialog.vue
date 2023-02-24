<template>
  <v-dialog v-model="isOpen" max-width="600px">
    <v-card class="pa-3">
      <v-card-title class="text-h5">Бюджет</v-card-title>
      <v-col>
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
        <v-row>
          <v-col>
            <v-text-field
              v-model.number="available"
              type="number"
              min="0"
              variant="outlined"
              label="У меня есть"
              prefix="$"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model.number="total"
              type="number"
              min="0"
              variant="outlined"
              label="Доступно"
              prefix="$"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red-darken-1" variant="text" @click="isOpen = false">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { useMoneyStore } from '@/stores/money.store';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const moneyStore = useMoneyStore();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const salary = computed({
  get: () => moneyStore.salary,
  set: (value) => moneyStore.setSalary(value),
});

const taxes = computed({
  get: () => moneyStore.taxes,
  set: (value) => moneyStore.setTaxes(value),
});

const available = computed({
  get: () => moneyStore.available,
  set: (value) => moneyStore.setAvailable(value),
});

const total = computed({
  get: () => moneyStore.total,
  set: (value) => moneyStore.setTotal(value),
});
</script>

<style scoped></style>
