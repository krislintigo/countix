<template>
  <v-col class="fix" @click.stop>
    <h3 class="text-h6 mb-3">Exchange rate</h3>
    <v-text-field outlined type="number" label="USD" :value="usdValue" @input="setUsdValue"></v-text-field>
    <v-text-field outlined type="number" :label="selected.abbr" :value="otherValue" @input="setOtherValue"></v-text-field>
    <v-select
      v-model="selected"
      label="Country"
      :items="countries"
      item-text="name"
      item-value="name"
      return-object
    >
    </v-select>
  </v-col>
</template>

<script>
import CurrencyApiService from "@/api/currency.apiService";

export default {
  name: 'ExchangeRate',
  data() {
    return {
      countries: [],
      selected: {
        name: '',
        abbr: '',
        value: 0
      },
      currency: {
        abbr: '',
        value: 0
      },
    }
  },
  methods: {
    setUsdValue(value) {
      this.currency = {
        abbr: 'USD',
        value
      }
    },
    setOtherValue(value) {
      this.currency = {
        abbr: this.selected.abbr,
        value
      }
    },
  },
  computed: {
    usdValue() {
      if (!this.countries.length) return 0
      return this.currency.abbr === 'USD'
        ? this.currency.value
        : this.currency.value / this.countries.find(country => country.abbr === this.selected.abbr)?.value
    },
    otherValue() {
      if (!this.countries.length) return 0
      return this.currency.abbr !== 'USD'
        ? this.currency.value
        : this.currency.value * this.countries.find(country => country.abbr === this.selected.abbr)?.value
    }
  },
  async mounted() {
    this.countries = await CurrencyApiService.getCountries()
    this.selected = this.countries[0]
  }
}
</script>

<style scoped>
.fix {
  background: white;
}
</style>
