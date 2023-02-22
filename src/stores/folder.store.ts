import { defineStore } from 'pinia';
import LocalStorageService from '@/services/localStorage.service';
import { IExpense } from '@/stores/expense.store';

export interface IFolderData {
  name: string;
}

export interface IFolder {
  id: number;
  name: string;
  expenses: IExpense[];
}

export const useFolderStore = defineStore('folder', {
  state: () => ({
    folders: LocalStorageService.getArray('folders') as IFolder[],
  }),
  actions: {
    setFolders(folders: IFolder[]) {
      this.folders = folders;
    },
    save(folder: IFolder) {
      if (folder.id) {
        this.folders.forEach((item) => {
          if (item.id === folder.id) {
            item.name = folder.name;
          }
        });
      } else {
        this.folders.push({ ...folder, id: Date.now(), expenses: [] });
      }
    },
    deleteFolder(id: number) {
      this.folders = this.folders.filter((item) => item.id !== id);
    },
  },
});
