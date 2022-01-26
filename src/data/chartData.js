export default {
  chart: {
    fontFamily: 'Roboto, sans-serif',
  },
  colors: ['#008FFB', '#FEB019', '#FF4560', '#775DD0', '#FD6A6A',
    '#00D9C6', '#3DDC84', '#6F0062', '#AA2407', '#74A325'],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          value: {
            formatter(value) {
              return `${value}$`;
            }
          }
        }
      }
    }
  },
  tooltip: {
    enabled: false,
  },
  legend: {
    show: true,
  },
  title: {
    text: 'Expenses',
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
    }
  }
}
