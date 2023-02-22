<template>
  <v-card :ripple="false" class="pa-3" @click.stop>
    <v-card-title>Курсы валют</v-card-title>
    <v-text-field
      v-model.number="USDValue"
      type="number"
      label="USD"
      variant="outlined"
    />
    <v-text-field
      v-model.number="otherValue"
      type="number"
      variant="outlined"
      :label="selected.abbr"
    />
    <v-select
      v-model="selected"
      label="Валюта"
      variant="outlined"
      :items="rates"
      item-title="name"
      item-value="name"
      return-object
    />
  </v-card>
</template>

<script setup lang="ts">
import CurrencyService, { IRate } from '@/services/currency.service';
import { computed, onMounted, reactive, ref } from 'vue';

const rates = ref<IRate[]>([]);

const state = reactive({
  abbr: '',
  value: 0,
});
const selected = reactive({
  name: '',
  abbr: '',
  value: 0,
});

const USDValue = computed({
  get: () => {
    if (!rates.value.length) return 0;
    return state.abbr === 'USD' ? state.value : tryConvert();
  },
  set: (value) => {
    Object.assign(state, { abbr: 'USD', value });
  },
});

const otherValue = computed({
  get: () => {
    if (!rates.value.length) return 0;
    return state.abbr === 'USD' ? tryConvert() : state.value;
  },
  set: (value) => {
    Object.assign(state, { abbr: selected.abbr, value });
  },
});

const tryConvert = () => {
  const rate =
    rates.value.find((rate) => rate.abbr === selected.abbr)?.value || 0;
  if (state.abbr === selected.abbr) return +(state.value / rate).toFixed(2);
  return +(state.value * rate).toFixed(2);
};

onMounted(async () => {
  rates.value = await CurrencyService.getCountries();
  Object.assign(selected, rates.value[0]);
});
</script>

<style scoped></style>
