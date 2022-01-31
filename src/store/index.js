import Vue from 'vue';
import Vuex from 'vuex';
import money from './modules/money';
import expenses from "@/store/modules/expenses";
import folder from "@/store/modules/folder";
import chartData from "@/data/chartData";
import LocalStorageService from "@/services/localStorage.service";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    money,
    expenses,
    folder
  },
  getters: {
    options: (state, getters) => ({
      labels: getters.labels,
      ...chartData,
    }),
  },
  mutations: {
    setExpensesAndFolders(state, getters) {
      LocalStorageService.setObject('basicExpenses', getters.basicExpenses);
      LocalStorageService.setObject('folders', getters.folders);
    },
  },
  actions: {
    setExpensesAndFolders({ commit, getters }) {
      commit('setExpensesAndFolders', getters);
    },
  }
});
