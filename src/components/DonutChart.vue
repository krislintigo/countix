<template>
  <section>
    <apex-chart
      type="donut"
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

</style>
