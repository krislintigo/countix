import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import App from './App.vue';
import store from './store';

Vue.use(VueApexCharts);
Vue.component('apex-chart', VueApexCharts);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
