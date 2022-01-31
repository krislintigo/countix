<template>
  <div>
    <section>
      <draggable v-model="basicExpenses" v-bind="dragOptions" group="expenses" @start="drag = true" @end="drag = false">
        <transition-group type="transition" :name="!drag ? 'flip-list' : null" class="main-list">
          <ExpenseItem
            v-for="expense in basicExpenses"
            :id="expense.id"
            :key="expense.id"
            @edit="$emit('editExpense', expense)"
          />
        </transition-group>
      </draggable>
    </section>
    <v-expansion-panels popout multiple class="d-block">
      <draggable v-model="folders" v-bind="dragOptions" group="folders" @start="drag = true" @end="drag = false">
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <v-expansion-panel v-for="(folder) in folders" :key="folder.id" class="list-group-item">
            <v-expansion-panel-header class="text-h5" disable-icon-rotate>
              {{ folder.name }} ({{ expenseAmountByFolder(folder.id) }}$)
              <template v-slot:actions>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      class="top-right mt-1"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-btn plain @click="$emit('editFolder', folder)">
                        <v-icon>mdi-pen</v-icon>
                        ⁣⁣Edit
                      </v-btn>
                    </v-list-item>
                    <v-list-item>
                      <v-btn plain @click="deleteFolder(folder.id)">
                        <v-icon>mdi-delete</v-icon>
                        ⁣⁣Delete
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <span class="mb-0 text-body-1">
                Payed: <span class="text-h6 green--text text--darken-1">{{payedAmountByFolder(folder.id)}}$</span>
              </span>
              <v-divider></v-divider>
              <span class="mb-0 text-body-1">
                Considered: <span class="text-h6 cyan--text text--darken-1">{{consideredAmountByFolder(folder.id)}}$</span>
              </span>
              <v-divider class="mb-5"></v-divider>
              <draggable v-model="folder.expenses" v-bind="dragOptions" group="expenses" @start="drag = true"
                         @end="updateFolders" @add="updateFolders"
              >
                <ExpenseItem
                  v-for="folderExpense in folder.expenses"
                  :id="folderExpense.id"
                  :key="folderExpense.id"
                  @edit="$emit('editExpense', folderExpense)"
                />
              </draggable>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </transition-group>
      </draggable>
    </v-expansion-panels>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ExpenseItem from "@/components/ExpenseItem";

export default {
  name: "ExpensesList",
  components: {
    ExpenseItem,
    draggable
  },
  data() {
    return {
      drag: false
    }
  },
  computed: {
    basicExpenses: {
      get() {
        return this.$store.getters.basicExpenses;
      },
      set(value) {
        this.$store.commit("setBasicExpenses", value);
      }
    },
    folders: {
      get() {
        return this.$store.getters.folders;
      },
      set(value) {
        this.$store.commit("setFolders", value);
      }
    },
    dragOptions: () => ({
      animation: 200,
      delay: 100,
      delayOnTouchOnly: true,
      ghostClass: 'my-ghost',
      setData(dataTransfer) {
        dataTransfer.setDragImage(new Image(), 0, 0);
      }
    }),
  },
  methods: {
    expenseAmountByFolder(folderId) {
      return this.folders
        .find(folder => folder.id === folderId)
        .expenses.reduce((acc, expense) => acc + expense.amount, 0);
    },
    payedAmountByFolder(folderId) {
      return this.folders
        .find(folder => folder.id === folderId)
        .expenses.reduce((acc, expense) => acc + (expense.payed ? expense.amount : 0), 0);
    },
    consideredAmountByFolder(folderId) {
      return this.folders
        .find(folder => folder.id === folderId)
        .expenses.reduce((acc, expense) => acc + (expense.considered ? expense.amount : 0), 0);
    },
    updateFolders() {
      this.drag = false;
      this.$store.commit("setFolders", this.folders);
    },
    deleteFolder(folderId) {
      this.$store.dispatch("deleteFolder", folderId);
    }
  }
}
</script>

<style scoped>
.main-list {
  display: block;
  min-height: 20px;
}

.list-group-item {
  cursor: move;
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
