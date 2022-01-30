<template>
  <v-dialog
    :value="open"
    @click:outside="$emit('close')"
    max-width="370px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        outlined
        dark
        v-bind="attrs"
        v-on="on"
        @click="$emit('setAppending')"
      >
        Add new expense
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        Expense information
      </v-card-title>
      <v-col @keydown.enter="$emit('save')">
        <v-text-field
          outlined
          label="Expense name"
          :value="expenseData.name"
          @input.native="$emit('setName', $event.target.value)"
        ></v-text-field>
        <v-text-field
          outlined
          label="Expense amount"
          prefix="$"
          :value="expenseData.amount"
          @input.native="$emit('setAmount', $event.target.value)"
        ></v-text-field>
      </v-col>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click="$emit('close')"
        >
          Close
        </v-btn>
        <v-btn
          color="primary darken-1"
          text
          @click="$emit('save')"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ExpenseDialog",
  props: {
    open: {
      type: Boolean,
      required: true
    },
    expenseData: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
