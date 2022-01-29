<template>
  <section>
    <v-card
      v-for="(expense, index) in basicExpenses"
      :key="expense.id"
      class="mb-3"
    >
      <v-card-title>{{expense.name}}</v-card-title>
      <v-card-subtitle>{{expense.amount}}$</v-card-subtitle>
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
            <v-btn plain @click="$emit('delete', index)">
              <v-icon>mdi-delete</v-icon>
              Delete
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-checkbox v-model="expense.considered" @change="$emit('switch', index)" label="Switch"></v-checkbox>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card>
  </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ExpensesList",
  computed: mapGetters([
    'basicExpenses'
  ]),
}
</script>

<style scoped>
.top-right {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
