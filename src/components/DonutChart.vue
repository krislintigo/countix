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
  labels: expenseStore.labels,
  datasets: [
    {
      backgroundColor: [
        '#3375B9',
        '#F44336',
        '#4CAF50',
        '#FB8C00',
        '#662E9B',
        '#F9CE1D',
        '#9E9E9E',
      ],
      borderWidth: 3,
      data: expenseStore.data,
      weight: 1.5,
    },
    {
      backgroundColor: [
        '#3375B9',
        '#F44336',
        '#4CAF50',
        '#FB8C00',
        '#662E9B',
        '#F9CE1D',
        '#9E9E9E',
      ],
      borderWidth: 3,
      data: expenseStore.unpayedData,
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
