<template>
  <section class="chart">
    <Doughnut :options="chartOptions" :data="chartData" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  ChartData,
} from 'chart.js';
import { useExpenseStore } from '@/stores/expense.store';
import chartOptions from '@/data/chartOptions';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const expenseStore = useExpenseStore();

const chartData = computed<ChartData>(() => ({
  // labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  labels: expenseStore.labels,
  datasets: [
    {
      backgroundColor: [
        '#3F51B5',
        '#03A9F4',
        '#4CAF50',
        '#F9CE1D',
        '#FF9800',
        '#D7263D',
        '#1B998B',
        '#2E294E',
        '#F46036',
        '#E2C044',
        '#662E9B',
        '#F86624',
        '#F9C80E',
        '#EA3546',
        '#43BCCD',
      ],
      data: expenseStore.data,
    },
  ],
}));
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
