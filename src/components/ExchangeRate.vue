<template>
  <v-col class="fix" @click.stop>
    <h3 class="text-h6 mb-3">Exchange rate</h3>
    <v-text-field
      outlined
      type="number"
      label="USD"
      :value="USDValue"
      @input="setUSDValue"
    ></v-text-field>
    <v-text-field
      outlined
      type="number"
      :label="state.selected.abbr"
      :value="otherValue"
      @input="setOtherValue"
    ></v-text-field>
    <v-select
      v-model="state.selected"
      label="Country"
      :items="state.countries"
      item-text="name"
      item-value="name"
      return-object
    >
    </v-select>
  </v-col>
</template>

<script setup lang="ts">
import CurrencyService from '@/services/currency.service';
import { computed, onMounted, reactive } from 'vue';

const state = reactive({
  countries: [],
  selected: {
    name: '',
    abbr: '',
    value: 0,
  },
  currency: {
    abbr: '',
    value: 0,
  },
});

const USDValue = computed(() => {
  if (!state.countries.length) return 0;
  return state.currency.abbr === 'USD'
    ? state.currency.value
    : +(
        state.currency.value /
        state.countries.find((country) => country.abbr === state.selected.abbr)
          .value
      ).toFixed(2);
});

const otherValue = computed(() => {
  if (!state.countries.length) return 0;
  return state.currency.abbr !== 'USD'
    ? state.currency.value
    : +(
        state.currency.value *
        state.countries.find((country) => country.abbr === state.selected.abbr)
          .value
      ).toFixed(2);
});

const setUSDValue = (value: string) => {
  state.currency = {
    abbr: 'USD',
    value: +value,
  };
};

const setOtherValue = (value: string) => {
  state.currency = {
    abbr: state.selected.abbr,
    value: +value,
  };
};

onMounted(async () => {
  state.countries = await CurrencyService.getCountries();
  state.selected = state.countries[0];
});
</script>

<style scoped>
.fix {
  background: white;
}
</style>
