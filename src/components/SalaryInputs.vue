<template>
  <div class="main">
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
export default {
  name: "SalaryInputs",
  props: {
    salary: {
      type: Number,
      required: true
    },
    taxes: {
      type: Number,
      required: true
    }
  },
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
