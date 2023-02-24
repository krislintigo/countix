import { defineStore } from 'pinia';
import { login, logout, push, register } from '@/api';
import { useMoneyStore } from '@/stores/money.store';
import { useFolderStore } from '@/stores/folder.store';
import { useExpenseStore } from '@/stores/expense.store';

const sync = (target: 'pull' | 'push', data?: any) => {
  const moneyStore = useMoneyStore();
  const folderStore = useFolderStore();
  const expenseStore = useExpenseStore();
  if (target === 'pull') {
    moneyStore.setSalary(data.salary || 0);
    moneyStore.setTaxes(data.taxes || 0);
    moneyStore.setAvailable(data.available || 0);
    moneyStore.setTotal(data.total || 0);
    folderStore.setFolders(data.folders || []);
    expenseStore.setExpenses(data.expenses || []);
  } else {
    return {
      salary: moneyStore.salary,
      taxes: moneyStore.taxes,
      available: moneyStore.available,
      total: moneyStore.total,
      folders: folderStore.folders,
      expenses: expenseStore.expenses,
    };
  }
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: '',
  }),
  actions: {
    async login(value: string | null) {
      const response = await login(value);
      if (response.ok) {
        this.user = response.data.login;
        sync('pull', response.data.data);
      } else {
        console.error(response);
      }
    },
    async registration(value: string) {
      const response = await register(value);
      if (response.ok) {
        this.user = response.data.login;
      } else {
        console.error(response);
      }
    },
    async logout() {
      console.log('logout');
      const response = await logout();
      if (response.ok) {
        this.user = '';
      } else {
        console.error(response);
      }
    },
    async push() {
      const data = sync('push');
      const response = await push(data);
      if (response.ok) {
        //
      } else {
        console.error(response);
      }
    },
  },
});
