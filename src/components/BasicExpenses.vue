<template>
  <section>
    <ExpensesList
      @edit="setEditExpense"
      @delete="deleteExpense"
      @switch="switchExpense"
    />
    <v-dialog
      v-model="dialog"
      max-width="370px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          outlined
          dark
          v-bind="attrs"
          v-on="on"
          @click="setAppendingExpense"
        >
          Add new
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Expense information
        </v-card-title>
        <v-col @keydown.enter="saveExpenseInfo">
          <v-text-field outlined label="Expense name" v-model="expenseData.name"></v-text-field>
          <v-text-field outlined label="Expense amount" prefix="$" v-model.number="expenseData.amount"></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="primary darken-1"
            text
            @click="saveExpenseInfo"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ExpensesList from "@/components/ExpensesList";

export default {
  name: 'BasicExpenses',
  components: {ExpensesList},
  data() {
    return {
      dialog: false,
      editFlag: false,
      expenseData: {
        name: '',
        amount: 0,
      },
    };
  },
  computed: mapGetters([
    'basicExpenses',
  ]),
  methods: {
    saveExpenseInfo() {
      if (this.editFlag) {
        this.$store.dispatch('updateBasicExpense', this.expenseData);
      }
      else {
        this.$store.dispatch('addBasicExpense', this.expenseData);
      }
      this.dialog = false;
    },
    setAppendingExpense() {
      this.editFlag = false;
      this.expenseData = {
        name: '',
        amount: 0,
      };
      this.dialog = true;
    },
    setEditExpense(expense) {
      this.editFlag = true;
      this.expenseData = {...expense};
      this.dialog = true;
    },
    deleteExpense(index) {
      this.$store.dispatch('deleteBasicExpense', index);
    },
    switchExpense(index) {
      this.$store.dispatch('switchBasicExpense', index);
    },
  },
};
</script>

<style scoped>

</style>
