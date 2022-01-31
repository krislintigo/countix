import LocalStorageService from '@/services/localStorage.service';

export default {
  state: {
    salary: LocalStorageService.getNumber('salary'),
    taxes: LocalStorageService.getNumber('taxes'),
  },
  getters: {
    salary: (state) => state.salary,
    taxes: (state) => state.taxes,
    netSalary: (state) => +(state.salary - (state.taxes / 100) * state.salary).toFixed(1),
    freeMoney: (state, getters) => +(getters.netSalary - getters.plannedExpenses).toFixed(1),
    freeMoneyPercent: (state, getters) => +((getters.freeMoney / getters.netSalary) * 100).toFixed(0),
  },
  mutations: {
    setSalary(state, salary) {
      state.salary = salary;
      LocalStorageService.setItem('salary', salary);
    },
    setTaxes(state, taxes) {
      state.taxes = taxes;
      LocalStorageService.setItem('taxes', taxes);
    },
  },
  actions: {
    setSalary({ commit }, salary) {
      commit('setSalary', salary);
    },
    setTaxes({ commit }, taxes) {
      commit('setTaxes', taxes);
    },
  },
};
