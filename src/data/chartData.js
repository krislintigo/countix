export default {
  chart: {
    fontFamily: 'Roboto, sans-serif',
  },
  colors: ['#3F51B5', '#03A9F4', '#4CAF50', '#F9CE1D', '#FF9800',
    '#D7263D', '#1B998B', '#2E294E', '#F46036', '#E2C044',
    '#662E9B', '#F86624', '#F9C80E', '#EA3546', '#43BCCD'],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          value: {
            formatter(value) {
              return `${value}$`;
            },
          },
        },
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  legend: {
    width: '200',
    show: true,
    position: 'left',
    offsetY: 20,
    fontSize: '13px'
  },
  title: {
    text: 'Expenses',
    style: {
      fontSize: '24px',
      fontWeight: '500',
    },
  },
  dataLabels: {
    style: {
      fontSize: '12px',
      fontWeight: 'normal'
    },
  },
  noData: {
    text: 'No data to display :(',
    style: {
      fontSize: '24px',
      fontWeight: '500',
    },
  },
  stroke: {
    width: 1,
  },
};
