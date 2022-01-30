<template>
  <v-col class="d-flex flex-column pb-0">
    <v-text-field
      class="text-h6"
      outlined
      label="Salary"
      prefix="$"
      type="number"
      v-model="salary"
      ></v-text-field>
    <v-text-field
      class="text-h6"
      outlined
      label="Taxes"
      prefix="%"
      type="number"
      v-model="taxes"
    ></v-text-field>
  </v-col>
</template>

<script>

export default {
  name: 'SalaryInputs',
  computed: {
    salary: {
      get() {
        return this.$store.getters.salary;
      },
      set(value) {
        this.$store.commit('setSalary', value);
      }
    },
    taxes: {
      get() {
        return this.$store.getters.taxes;
      },
      set(value) {
        this.$store.commit('setTaxes', value);
      }
    }
  }
};
</script>

<style scoped>

</style>
