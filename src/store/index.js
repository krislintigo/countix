import Vue from 'vue';
import Vuex from 'vuex';
import money from './modules/money';
import expenses from "@/store/modules/expenses";
import folder from "@/store/modules/folder";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    money,
    expenses,
    folder
  },
});
