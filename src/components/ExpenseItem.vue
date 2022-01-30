<template>
  <v-card
    class="mb-3 list-group-item"
  >
    <v-card-title>{{ expense.name }}</v-card-title>
    <v-card-subtitle>{{ expense.amount }}$</v-card-subtitle>
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
          <v-btn plain @click="$emit('edit', expense)">
            <v-icon>mdi-pen</v-icon>
            Edit
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn plain @click="deleteExpense(index)">
            <v-icon>mdi-delete</v-icon>
            Delete
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-checkbox v-model="expense.considered" @change="switchExpense(index)" label="Switch"></v-checkbox>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card>
</template>

<script>
export default {
  name: "ExpenseItem",
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    expense: {
      get() {
        return this.$store.getters.basicExpenses[this.index]
      }
    }
  },
  methods: {
    deleteExpense(index) {
      this.$store.dispatch('deleteBasicExpense', index);
    },
    switchExpense(index) {
      this.$store.dispatch('switchBasicExpense', index);
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
