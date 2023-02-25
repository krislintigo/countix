// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { defineStore } from 'pinia';
import { useExpenseStore } from '@/stores/expense.store';

export const useMoneyStore = defineStore('money', {
  state: () => ({
    salary: 0,
    taxes: 0,
    inStock: 0,
    available: 0,
  }),
  getters: {
    netSalary(state): number {
      return +(state.salary - (state.taxes / 100) * state.salary).toFixed(1);
    },
    freeMoney(): number {
      if (!this) return 0;
      return +(this.netSalary - this.consideredExpensesAmount).toFixed(1);
    },
    consideredExpensesAmount(): number {
      const expenseStore = useExpenseStore();
      return expenseStore.consideredExpenses.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );
    },
    pendingExpensesAmount(): number {
      const expenseStore = useExpenseStore();
      return expenseStore.consideredExpenses.reduce(
        (acc, expense) =>
          acc + +(expense.amount - expense.payed * expense.amount).toFixed(0),
        0
      );
    },
  },
  actions: {
    setSalary(salary: number) {
      this.salary = salary;
    },
    setTaxes(taxes: number) {
      this.taxes = taxes;
    },
    setInStock(inStock: number) {
      this.inStock = inStock;
    },
    setAvailable(available: number) {
      this.available = available;
    },
  },
});
