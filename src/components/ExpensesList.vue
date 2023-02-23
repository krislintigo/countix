<template>
  <div>
    <section>
      <transition-group
        type="transition"
        tag="div"
        :name="!drag ? 'flip-list' : null"
        class="main-list"
      >
        <draggable
          v-model="expenses"
          v-bind="dragOptions"
          :key="1"
          group="expenses"
          item-key="id"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element: expense }">
            <ExpenseItem
              :id="expense.id"
              @edit="$emit('editExpense', expense)"
            />
          </template>
        </draggable>
      </transition-group>
    </section>
    {{ expanded }}
    <v-expansion-panels v-model="expanded" popout multiple class="d-block">
      <transition-group
        tag="div"
        type="transition"
        :name="!drag ? 'flip-list' : null"
      >
        <draggable
          v-model="folders"
          v-bind="dragOptions"
          :key="1"
          group="folders"
          item-key="id"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element: folder }">
            <v-expansion-panel class="mt-3" @group:selected="expandPanel">
              <v-expansion-panel-title class="text-h5" disable-icon-rotate>
                {{ folder.name }} (${{ folderStatistic(folder.id).all }})
                <template #actions>
                  <v-menu offset-y>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon
                        variant="text"
                        class="top-right mt-1"
                        v-bind="props"
                      >
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-btn
                          variant="plain"
                          @click="$emit('editFolder', folder)"
                        >
                          <v-icon>mdi-pen</v-icon>
                          ⁣⁣Edit
                        </v-btn>
                      </v-list-item>
                      <v-list-item>
                        <v-btn variant="plain" @click="deleteFolder(folder.id)">
                          <v-icon>mdi-delete</v-icon>
                          ⁣⁣Delete
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <span class="mb-0 text-body-1">
                  Оплаченные:
                  <span class="text-h6 text-success">
                    ${{ folderStatistic(folder.id).payed }}
                  </span>
                  ( ещё не оплачено
                  <span class="text-h6 text-warning">
                    ${{ folderStatistic(folder.id).pending }}
                  </span>
                  )
                </span>
                <v-divider />
                <span class="mb-0 text-body-1">
                  Учитываемые:
                  <span class="text-h6 text-info">
                    ${{ folderStatistic(folder.id).considered }}
                  </span>
                </span>
                <v-divider class="mb-5"></v-divider>
                <draggable
                  v-model="folder.expenses"
                  v-bind="dragOptions"
                  group="expenses"
                  item-key="id"
                  @start="drag = true"
                  @add="updateFolders"
                  @end="updateFolders"
                >
                  <template #item="{ element: folderExpense }">
                    <ExpenseItem
                      :id="folderExpense.id"
                      @edit="$emit('editExpense', folderExpense)"
                    />
                  </template>
                </draggable>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </template>
        </draggable>
      </transition-group>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import ExpenseItem from '@/components/ExpenseItem';
import { computed, ref, watchEffect } from 'vue';
import { useExpenseStore } from '@/stores/expense.store';
import { useFolderStore } from '@/stores/folder.store';

const dragOptions = {
  animation: 200,
  delay: 100,
  delayOnTouchOnly: true,
  ghostClass: 'my-ghost',
  setData(dataTransfer: any) {
    dataTransfer.setDragImage(new Image(), 0, 0);
  },
};

const expenseStore = useExpenseStore();
const folderStore = useFolderStore();

const drag = ref(false);

const expanded = ref([]);
const expandPanel = () => {
  alert('exp');
};

const expenses = computed({
  get: () => expenseStore.expenses,
  set: (value) => expenseStore.setExpenses(value),
});

const folders = computed({
  get: () => folderStore.folders,
  set: (value) => folderStore.setFolders(value),
});

const folderStatistic = (folderId: number) => {
  const folder = folders.value.find((folder) => folder.id === folderId);
  if (!folder) return { all: 0, payed: 0, considered: 0, pending: 0 };
  return {
    all: folder.expenses.reduce((acc, expense) => acc + expense.amount, 0),
    payed: folder.expenses.reduce(
      (acc, expense) => acc + +(expense.payed * expense.amount).toFixed(0),
      0
    ),
    considered: folder.expenses.reduce(
      (acc, expense) => acc + (expense.considered ? expense.amount : 0),
      0
    ),
    pending: folder.expenses.reduce(
      (acc, expense) =>
        acc +
        (expense.considered
          ? +(expense.amount - expense.payed * expense.amount).toFixed(0)
          : 0),
      0
    ),
  };
};

const updateFolders = () => {
  drag.value = false;
  folderStore.setFolders(folders.value);
};

const deleteFolder = (folderId: number) => folderStore.deleteFolder(folderId);
</script>

<style scoped>
.main-list {
  display: block;
  min-height: 20px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.my-ghost {
  opacity: 1;
}
</style>
