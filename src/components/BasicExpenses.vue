<template>
  <section>
    <div class="expense-list">
      <div v-for="(expense, index) in basicExpenses" :key="expense.name" class="expense-item">
        <p class="expense-item-p">Expense name: {{ expense.name }}</p>
        <p class="expense-item-p">Expense amount: {{ expense.amount }}$</p>
        <button
          class="absolute-button delete-expense"
          @click="deleteExpense(index)"
        >
          <i class="fas fa-trash"></i>
        </button>
        <button
          class="absolute-button switch-expense"
          @click="switchExpense(index)"
        >
          <span
            :class="expense.considered ? 'bg-green' :'bg-red'"
            class="switch-expense-inner"
          >
            <i class="fas fa-check"></i>
          </span>
        </button>
      </div>
    </div>
    <button
      v-if="!addingNew"
      class="add-button"
      @click="addingNew = true"
    >
      <i class="fas fa-plus"></i>
    </button>
    <div v-else class="new-expense" @keydown.enter="saveNewExpense">
      <span>Expense name:</span>
      <input
        v-model="newExpense.name"
      >
      <span>Expense amount:</span>
      <span class="big-span">
        $
        <input
          type="number"
          v-model.number="newExpense.amount"
        >
      </span>
      <button
        @click="saveNewExpense"
        class="save-button"
      >
        <span><i class="far fa-save"></i> Add</span>
      </button>
    </div>
  </section>
</template>

<script>
import LocalStorageService from "@/services/localStorage.service";

export default {
  name: "BasicExpenses",
  props: {
    basicExpenses: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      addingNew: false,
      newExpense: {
        name: "",
        amount: 0
      }
    }
  },
  methods: {
    saveNewExpense() {
      this.basicExpenses.push({ ...this.newExpense, considered: true })
      LocalStorageService.setObject("basicExpenses", this.basicExpenses)
      this.resetNewExpense()
      this.addingNew = false
    },
    deleteExpense(index) {
      this.basicExpenses.splice(index, 1)
      LocalStorageService.setObject("basicExpenses", this.basicExpenses)
    },
    switchExpense(index) {
      this.basicExpenses.forEach((expense, i) => {
        if (i === index) {
          expense.considered = !expense.considered
        }
      })
      LocalStorageService.setObject("basicExpenses", this.basicExpenses)
    },
    resetNewExpense() {
      this.newExpense = {
        name: "",
        amount: 0
      }
    }
  }
}
</script>

<style scoped>
.expense-list {
  margin: 30px 0;
}

.expense-item {
  position: relative;
  width: 500px;
  margin-bottom: 10px;
  padding: 5px;
  font-size: 20px;
  border: 1px solid deepskyblue;
}

.expense-item-p {
  margin: 10px;
}

.absolute-button {
  position: absolute;
  background: none;
  padding: 5px;
  font-size: 16px;
}

.delete-expense {
  right: 0;
  top: 0;
}

.switch-expense {
  right: 0;
  bottom: 0;
}

.switch-expense-inner {
  padding: 1px;
  border-radius: 2px;
}

.add-button {
  background: none;
  font-size: 40px;
}

.new-expense {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.save-button {
  padding: 5px;
  border-radius: 3px;
  font-size: 24px;
}


.bg-green {
  background: green;
}
.bg-red {
  background: red;
}

@media (max-width: 1000px) {
  .expense-item {
    width: 100%;
  }
}
</style>
