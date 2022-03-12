<template>
  <v-dialog
    :value="open"
    @click:outside="$emit('close')"
    max-width="370px"
  >
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
        />
        <v-text-field
          outlined
          label="Expense amount"
          prefix="$"
          :value="expenseData.amount"
          @input.native="$emit('setAmount', $event.target.value)"
        />
        <v-textarea
          outlined
          label="Expense description"
          rows="4"
          auto-grow
          no-resize
          :value="expenseData.description"
          @input.native="$emit('setDescription', $event.target.value)"
        />
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
