<template>
  <apex-chart
    type="donut"
    width="100%"
    :options="options"
    :series="series"
  >
  </apex-chart>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "DonutChart",
  computed: mapGetters([
    'series',
    'options'
  ])
}
</script>

<style scoped>

</style>
