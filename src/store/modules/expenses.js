import LocalStorageService from "@/services/localStorage.service";

export default {
  state: {
    basicExpenses: LocalStorageService.getArray('basicExpenses'),
  },
  getters: {
    basicExpenses: (state) => state.basicExpenses,
    flatBasicExpenses: (state, getters) => {
      const flatBasicExpenses = [];
      getters.folders.forEach((folder) => {
        folder.expenses.forEach((expense) => {
          flatBasicExpenses.push(expense);
        });
      });
      state.basicExpenses.forEach((basicExpense) => {
        flatBasicExpenses.push(basicExpense);
      });
      return flatBasicExpenses;
    },
    basicExpenseById: (state, getters) => (id) => getters.flatBasicExpenses.find((item) => item.id === id),
    consideredExpenses: (state, getters) => getters.flatBasicExpenses.filter((expense) => expense.considered),
    plannedExpenses:
      (state, getters) => getters.consideredExpenses.reduce((acc, cur) => acc + cur.amount, 0),
    labels: (state, getters) => getters.consideredExpenses.map((expense) => expense.name),
    series: (state, getters) => getters.consideredExpenses.map((expense) => expense.amount),
  },
  mutations: {
    setBasicExpenses(state, basicExpenses) {
      state.basicExpenses = basicExpenses;
      LocalStorageService.setObject('basicExpenses', basicExpenses);
    },
    addBasicExpense(state, expense) {
      state.basicExpenses.push({ ...expense, considered: true, id: Date.now() });
      LocalStorageService.setObject('basicExpenses', state.basicExpenses);
    },
    updateBasicExpense(state, {expense, getters}) {
      state.basicExpenses.forEach((item) => {
        if (item.id === expense.id) {
          item.name = expense.name;
          item.amount = expense.amount;
        }
      });
      getters.folders.forEach((folder) => {
        folder.expenses.forEach((item) => {
          if (item.id === expense.id) {
            item.name = expense.name;
            item.amount = expense.amount;
          }
        });
      });
      LocalStorageService.setObject('basicExpenses', state.basicExpenses);
      LocalStorageService.setObject('folders', getters.folders);
    },
    deleteBasicExpense(state, {id, getters}) {
      state.basicExpenses = state.basicExpenses.filter((item) => item.id !== id);
      getters.folders.forEach((folder) => {
        folder.expenses = folder.expenses.filter((item) => item.id !== id);
      });
      LocalStorageService.setObject('basicExpenses', state.basicExpenses);
      LocalStorageService.setObject('folders', getters.folders);
    },
  },
  actions: {
    addBasicExpense({ commit }, expense) {
      commit('addBasicExpense', expense);
    },
    updateBasicExpense({ commit, getters }, expense) {
      commit('updateBasicExpense', {expense, getters});
    },
    deleteBasicExpense({ commit, getters }, id) {
      commit('deleteBasicExpense', {id, getters});
    },
  }
}
