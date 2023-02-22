// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { defineStore } from 'pinia';
import LocalStorageService from '@/services/localStorage.service';
import { useFolderStore } from '@/stores/folder.store';

export interface IExpenseData {
  name: string;
  amount: number;
  description: string;
}

export interface IExpense {
  id: number;
  name: string;
  amount: number;
  description: string;
  considered: boolean;
  payed: boolean;
}

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: LocalStorageService.getArray('expenses') as IExpense[],
  }),
  getters: {
    flatExpenses(state): IExpense[] {
      const folderStore = useFolderStore();
      const flatExpenses: IExpense[] = [];
      folderStore.folders.forEach((folder) => {
        folder.expenses.forEach((expense) => {
          flatExpenses.push(expense);
        });
      });
      state.expenses.forEach((expense) => {
        flatExpenses.push(expense);
      });
      return flatExpenses;
    },
    consideredExpenses(): IExpense[] {
      if (!this) return [];
      return this.flatExpenses.filter((expense) => expense.considered);
    },
    labels(): string[] {
      if (!this) return [];
      return this.consideredExpenses.map((expense) => expense.name);
    },
    data(): number[] {
      if (!this) return [];
      return this.consideredExpenses.map((expense) => expense.amount);
    },
  },
  actions: {
    setExpenses(expenses: IExpense[]) {
      this.expenses = expenses;
    },
    save(expense: IExpense) {
      const folderStore = useFolderStore();
      if (expense.id) {
        this.expenses.forEach((item) => {
          if (item.id === expense.id) {
            item.name = expense.name;
            item.amount = expense.amount;
            item.description = expense.description;
          }
        });
        folderStore.folders.forEach((folder) => {
          folder.expenses.forEach((item) => {
            if (item.id === expense.id) {
              item.name = expense.name;
              item.amount = expense.amount;
              item.description = expense.description;
            }
          });
        });
      } else {
        this.expenses.push({
          ...expense,
          considered: true,
          payed: false,
          id: Date.now(),
        });
      }
    },
    deleteExpense(id) {
      const folderStore = useFolderStore();
      this.expenses = this.expenses.filter((item) => item.id !== id);
      folderStore.folders.forEach((folder) => {
        folder.expenses = folder.expenses.filter((item) => item.id !== id);
      });
    },
    resetPaid() {
      const folderStore = useFolderStore();
      this.expenses.forEach((expense) => {
        expense.payed = false;
      });
      folderStore.folders.forEach((folder) => {
        folder.expenses.forEach((expense) => {
          expense.payed = false;
        });
      });
      LocalStorageService.setObject('expenses', this.expenses);
      LocalStorageService.setObject('folders', folderStore.folders);
    },
  },
});
