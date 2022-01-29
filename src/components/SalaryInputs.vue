<template>
  <v-col class="d-flex flex-column">
    <v-text-field
      outlined
      label="Salary"
      prefix="$"
      type="number"
      :value="salary"
      @input.native="$emit('updateSalary', +$event.target.value)"
      ></v-text-field>
    <v-text-field
      outlined
      label="Taxes"
      prefix="%"
      type="number"
      :value="taxes"
      @input.native="$emit('updateTaxes', +$event.target.value)"
    ></v-text-field>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SalaryInputs',
  computed: mapGetters([
    'salary',
    'taxes',
  ]),
};
</script>

<style scoped>

</style>
