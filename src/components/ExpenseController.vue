<template>
  <section>
    <ExpensesList
      @edit-expense="openExpenseModal($event, 'update')"
      @edit-folder="openFolderModal($event, 'update')"
    />
    <v-menu transition="slide-y-reverse-transition">
      <template #activator="{ props }">
        <v-btn
          position="fixed"
          :style="{
            right: '20px',
            bottom: '20px',
            zIndex: 10,
          }"
          v-bind="props"
          color="blue-darken-2"
          icon
        >
          <v-icon
            :icon="props['aria-expanded'] === 'true' ? 'mdi-close' : 'mdi-plus'"
          />
        </v-btn>
      </template>
      <v-btn
        icon
        color="red"
        class="mb-3"
        @click="openExpenseModal(null, 'create')"
      >
        <v-icon icon="mdi-cash-multiple" />
      </v-btn>
      <v-btn
        icon
        color="green"
        class="mb-3"
        @click="openFolderModal(null, 'create')"
      >
        <v-icon icon="mdi-folder-outline" />
      </v-btn>
    </v-menu>
    <ExpenseDialog
      v-model="dialog.expense"
      v-model:expense="expense"
      @save="saveExpense"
    />
    <FolderDialog
      v-model="dialog.folder"
      v-model:folder="folder"
      @save="saveFolder"
    />
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import ExpensesList from '@/components/ExpensesList';
import ExpenseDialog from '@/components/dialogs/ExpenseDialog';
import FolderDialog from '@/components/dialogs/FolderDialog';
import { IExpense, useExpenseStore } from '@/stores/expense.store';
import { IFolder, useFolderStore } from '@/stores/folder.store';

const EMPTY_EXPENSE_DATA = {
  name: '',
  amount: 0,
  description: '',
};
const EMPTY_FOLDER_DATA = {
  name: '',
};

const expenseStore = useExpenseStore();
const folderStore = useFolderStore();

const dialog = reactive({
  expense: false,
  folder: false,
  editFlag: false,
});
const expense = reactive(EMPTY_EXPENSE_DATA);
const folder = reactive(EMPTY_FOLDER_DATA);

const openExpenseModal = (value: IExpense, target: 'create' | 'update') => {
  if (target === 'create') {
    for (const key in expense) delete expense[key];
    Object.assign(expense, EMPTY_EXPENSE_DATA);
  } else Object.assign(expense, value);
  dialog.expense = true;
};

const saveExpense = (value: IExpense) => expenseStore.save(value);

const openFolderModal = (value: IFolder, target: 'create' | 'update') => {
  if (target === 'create') {
    for (const key in folder) delete folder[key];
    Object.assign(folder, EMPTY_FOLDER_DATA);
  } else Object.assign(folder, value);
  dialog.folder = true;
};

const saveFolder = (value: IFolder) => folderStore.save(value);

// export default {
//   name: 'BasicExpenses',
//   components: { FolderDialog, ExpenseDialog, ExpensesList },
//   data() {
//     return {
//       fab: false,
//       expenseDialog: false,
//       folderDialog: false,
//       editFlag: false,
//       expenseData: {
//         name: '',
//         amount: 0,
//         description: '',
//       },
//       folderData: {
//         name: '',
//       },
//     };
//   },
//   // computed: mapGetters(['basicExpenses']),
//   methods: {
//     setExpenseName(name) {
//       this.expenseData.name = name;
//     },
//     setExpenseAmount(amount) {
//       this.expenseData.amount = +amount;
//     },
//     setExpenseDescription(description) {
//       this.expenseData.description = description;
//     },
//     setFolderName(name) {
//       this.folderData.name = name;
//     },
//     closeExpenseDialog() {
//       this.expenseDialog = false;
//     },
//     closeFolderDialog() {
//       this.folderDialog = false;
//     },
//     saveExpenseInfo() {
//       if (this.editFlag) {
//         this.$store.dispatch('updateBasicExpense', this.expenseData);
//       } else {
//         this.$store.dispatch('addBasicExpense', this.expenseData);
//       }
//       this.expenseDialog = false;
//     },
//     saveFolderInfo() {
//       if (this.editFlag) {
//         this.$store.dispatch('updateFolder', this.folderData);
//       } else {
//         this.$store.dispatch('addFolder', this.folderData);
//       }
//       this.folderDialog = false;
//     },
//     setAppendingExpense() {
//       this.editFlag = false;
//       this.expenseData = {
//         name: '',
//         amount: 0,
//       };
//       this.expenseDialog = true;
//     },
//     setAppendingFolder() {
//       this.editFlag = false;
//       this.folderData = {
//         name: '',
//       };
//       this.folderDialog = true;
//     },
//     setEditExpense(expense) {
//       this.editFlag = true;
//       this.expenseData = { ...expense };
//       this.expenseDialog = true;
//     },
//     setEditFolder(folder) {
//       this.editFlag = true;
//       this.folderData = { ...folder };
//       this.folderDialog = true;
//     },
//   },
// };
</script>

<style scoped></style>
