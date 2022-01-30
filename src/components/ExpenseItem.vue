<template>
  <v-card
    class="mb-3 list-group-item"
  >
    <v-card-title>{{ expense.name }}</v-card-title>
    <v-card-subtitle>{{ expense.amount }}$</v-card-subtitle>
    <v-menu offset-y close-on-content-click>
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
          <v-btn plain @click="$emit('edit', expense)">
            <v-icon>mdi-pen</v-icon>
            ⁣⁣Edit
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn plain @click="deleteExpense(expense.id)">
            <v-icon>mdi-delete</v-icon>
            ⁣⁣Delete
          </v-btn>
        </v-list-item>
        <v-list-item class="justify-center">
          <v-switch v-model="expense.considered" @change="switchExpense" label="Switch"></v-switch>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card>
</template>

<script>
export default {
  name: "ExpenseItem",
  props: {
    id: {
      type: Number,
      required: true
    },
  },
  computed: {
    expense: {
      get() {
        return this.$store.getters.basicExpenseById(this.id)
      }
    }
  },
  methods: {
    deleteExpense(id) {
      this.$store.dispatch('deleteBasicExpense', id);
    },
    switchExpense() {
      this.$store.dispatch('setExpensesAndFolders');
    },
  }
}
</script>

<style scoped>
.top-right {
  position: absolute;
  top: 0;
  right: 0;
}
.list-group-item {
  cursor: move;
}
</style>
