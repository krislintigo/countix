import LocalStorageService from '@/services/localStorage.service';
import chartData from '@/data/chartData';

export default {
  state: {
    salary: LocalStorageService.getNumber('salary'),
    taxes: LocalStorageService.getNumber('taxes'),
    basicExpenses: LocalStorageService.getArray('basicExpenses'),
    folders: LocalStorageService.getArray('folders'),
  },
  getters: {
    salary: (state) => state.salary,
    taxes: (state) => state.taxes,
    basicExpenses: (state) => state.basicExpenses,
    flatBasicExpenses: (state) => {
      const flatBasicExpenses = [];
      state.basicExpenses.forEach((basicExpense) => {
        flatBasicExpenses.push(basicExpense);
      });
      state.folders.forEach((folder) => {
        folder.expenses.forEach((expense) => {
          flatBasicExpenses.push(expense);
        });
      });
      return flatBasicExpenses;
    },
    basicExpenseById: (state, getters) => (id) => getters.flatBasicExpenses.find((item) => item.id === id),
    folders: (state) => state.folders,
    netSalary: (state) => +(state.salary - (state.taxes / 100) * state.salary).toFixed(1),
    freeMoney: (state, getters) => +(getters.netSalary - getters.plannedExpenses).toFixed(1),
    freeMoneyPercent: (state, getters) => +((getters.freeMoney / getters.netSalary) * 100).toFixed(0),
    consideredExpenses: (state, getters) => getters.flatBasicExpenses.filter((expense) => expense.considered),
    plannedExpenses:
      (state, getters) => getters.consideredExpenses.reduce((acc, cur) => acc + cur.amount, 0),
    labels: (state, getters) => getters.consideredExpenses.map((expense) => expense.name),
    series: (state, getters) => getters.consideredExpenses.map((expense) => expense.amount),
    options: (state, getters) => ({
      labels: getters.labels,
      ...chartData,
    }),
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
    setBasicExpenses(state, basicExpenses) {
      state.basicExpenses = basicExpenses;
      LocalStorageService.setObject('basicExpenses', basicExpenses);
    },
    setFolders(state, folders) {
      state.folders = folders;
      LocalStorageService.setObject('folders', folders);
    },
    addBasicExpense(state, expense) {
      state.basicExpenses.push({ ...expense, considered: true, id: Date.now() });
      LocalStorageService.setObject('basicExpenses', state.basicExpenses);
    },
    updateBasicExpense(state, expense) {
      state.basicExpenses.forEach((item) => {
        if (item.id === expense.id) {
          item.name = expense.name;
          item.amount = expense.amount;
        }
      });
      state.folders.forEach((folder) => {
        folder.expenses.forEach((item) => {
          if (item.id === expense.id) {
            item.name = expense.name;
            item.amount = expense.amount;
          }
        });
      });
      LocalStorageService.setObject('basicExpenses', state.basicExpenses);
      LocalStorageService.setObject('folders', state.folders);
    },
    deleteBasicExpense(state, id) {
      state.basicExpenses = state.basicExpenses.filter((item) => item.id !== id);
      state.folders.forEach((folder) => {
        folder.expenses = folder.expenses.filter((item) => item.id !== id);
      });
      LocalStorageService.setObject('basicExpenses', state.basicExpenses);
      LocalStorageService.setObject('folders', state.folders);
    },
    switchBasicExpense(state) {
      LocalStorageService.setObject('basicExpenses', state.basicExpenses);
      LocalStorageService.setObject('folders', state.folders);
    },
    addFolder(state, folder) {
      state.folders.push({ ...folder, id: Date.now(), expenses: [] });
      LocalStorageService.setObject('folders', state.folders);
    },
  },
  actions: {
    setSalary({ commit }, salary) {
      commit('setSalary', salary);
    },
    setTaxes({ commit }, taxes) {
      commit('setTaxes', taxes);
    },
    addBasicExpense({ commit }, expense) {
      commit('addBasicExpense', expense);
    },
    updateBasicExpense({ commit }, expense) {
      commit('updateBasicExpense', expense);
    },
    deleteBasicExpense({ commit }, id) {
      commit('deleteBasicExpense', id);
    },
    switchBasicExpense({ commit }, index) {
      commit('switchBasicExpense', index);
    },
    addFolder({ commit }, folder) {
      commit('addFolder', folder);
    },
  },
};
