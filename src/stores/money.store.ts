// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { defineStore } from 'pinia';
import LocalStorageService from '@/services/localStorage.service';
import { useExpenseStore } from '@/stores/expense.store';

export const useMoneyStore = defineStore('money', {
  state: () => ({
    salary: LocalStorageService.getNumber('salary'),
    taxes: LocalStorageService.getNumber('taxes'),
  }),
  getters: {
    netSalary(state): number {
      return +(state.salary - (state.taxes / 100) * state.salary).toFixed(1);
    },
    freeMoney(): number {
      if (!this) return 0;
      return +(this.netSalary - this.plannedExpensesAmount).toFixed(1);
    },
    freeMoneyPercent(): number {
      if (!this) return 0;
      return +((this.freeMoney / this.netSalary) * 100).toFixed(0);
    },
    plannedExpensesAmount(): number {
      const expenseStore = useExpenseStore();
      return expenseStore.consideredExpenses.reduce(
        (acc, cur) => acc + cur.amount,
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
  },
});
