<template>
  <section class="chart">
    <apex-chart
      type="donut"
      width="600px"
      :options="options"
      :series="series"
    >
    </apex-chart>
  </section>
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
.chart {

}

@media (max-width: 600px) {
  .chart {
    overflow-x: auto;
  }
}

</style>
