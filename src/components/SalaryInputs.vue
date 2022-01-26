<template>
  <div class="main">
    <span>Salary:</span>
    <span class="big-span">
      $
      <input
        type="number"
        placeholder="Salary"
        min="0"
        :value="salary"
        @input="$emit('updateSalary', +$event.target.value)"
      >
    </span>
    <span>Taxes:</span>
    <span class="big-span">
      %
      <input
        type="number"
        placeholder="Taxes"
        min="0"
        max="100"
        :value="taxes"
        @input="$emit('updateTaxes', +$event.target.value)"
      >
    </span>
  </div>
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
.main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
