<template>
  <div>
    <section>
      <draggable v-model="basicExpenses" v-bind="dragOptions1" @start="drag = true" @end="drag = false" class="main-list">
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <ExpenseItem
            v-for="(expense, index) in basicExpenses"
            :id="expense.id"
            :index="index"
            :key="expense.id"
            @edit="$emit('editExpense', expense)"
          />
        </transition-group>
      </draggable>
    </section>
    <v-expansion-panels popout multiple :key="666" class="mb-3 d-block">
      <draggable v-model="folders" v-bind="dragOptions2" @start="drag = true" @end="drag = false">
          <v-expansion-panel v-for="(folder, i) in folders" :key="i">
            <v-expansion-panel-header class="text-h5">{{ folder.name }} ({{ expenseAmountByFolder(folder.id) }}$)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <draggable v-model="folder.expenses" v-bind="dragOptions1" @start="drag = true" @end="drag = false;">
                <ExpenseItem
                  v-for="(folderExpense, idx) in folder.expenses"
                  :id="folderExpense.id"
                  :index="idx"
                  :key="folderExpense.id"
                  @edit="$emit('editExpense', folderExpense)"
                />
              </draggable>
            </v-expansion-panel-content>
          </v-expansion-panel>
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
        this.$store.commit("setFolders", this.folders);
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
    dragOptions1() {
      return {
        animation: 200,
        group: 'expenses',
        disabled: false,
        ghostClass: 'my-ghost',
      }
    },
    dragOptions2() {
      return {
        animation: 200,
        group: 'folders',
        disabled: false,
        ghostClass: 'my-ghost',
      }
    }
  },
  methods: {
    expenseAmountByFolder(folderId) {
      return this.folders
        .find(folder => folder.id === folderId)
        .expenses.reduce((acc, expense) => acc + expense.amount, 0);
    }
  }
}
</script>

<style scoped>
.main-list {
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
