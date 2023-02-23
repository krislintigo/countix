import { ChartOptions } from 'chart.js';

export default {
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
        boxWidth: 25,
        boxHeight: 10,
        font: {
          family: 'Rubik',
          size: 13,
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
        size: 15,
      },
      bodyColor: 'black',
      bodyFont: {
        family: 'Rubik',
        size: 13,
      },
      callbacks: {
        beforeBody: (tooltipItem) => {
          const data = tooltipItem[0].dataset.data as number[];
          const value = tooltipItem[0].formattedValue;
          const percent = (
            (tooltipItem[0].parsed / data.reduce((acc, cur) => acc + cur)) *
            100
          ).toFixed(0);
          tooltipItem[0].formattedValue = ` $${value} (${percent}%)`;
        },
      },
    },
  },
} as ChartOptions;
