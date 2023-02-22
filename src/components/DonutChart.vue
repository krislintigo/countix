<template>
  <section class="chart">
    <Doughnut :options="chartOptions" :data="chartData" />
  </section>
</template>

<script setup lang="ts">
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
  ChartOptions,
} from 'chart.js';
import { useExpenseStore } from '@/stores/expense.store';
import { computed } from 'vue';

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
      // data: [40, 20, 80, 10],
      data: expenseStore.data,
    },
  ],
}));

const chartOptions = computed<ChartOptions>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
    },
    subtitle: {
      display: false,
    },
    legend: {
      display: true,
      position: 'left',
      align: 'start',
      labels: {
        font: {
          family: 'Rubik',
        },
      },
      title: {
        display: true,
        color: 'white',
        text: 'Расходы',
        font: {
          size: 28,
          family: 'Rubik',
        },
      },
    },
    tooltip: {
      backgroundColor: 'white',
      titleColor: 'dimgray',
      titleFont: {
        family: 'Rubik',
      },
      bodyColor: 'black',
      bodyFont: {
        family: 'Rubik',
      },
      callbacks: {
        beforeBody: function (tooltipItem) {
          const value = tooltipItem[0].formattedValue;
          tooltipItem[0].formattedValue = ` $${value}`;
        },
      },
    },
  },
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
