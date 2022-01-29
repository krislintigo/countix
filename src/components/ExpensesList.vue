<template>
  <draggable v-model="basicExpenses" v-bind="dragOptions" @start="drag = true" @end="drag = false">
    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      <v-card
        v-for="(expense, index) in basicExpenses"
        :key="expense.id"
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
    </transition-group>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "ExpensesList",
  components: {
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
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'my-ghost',
        chosenClass: 'my-chosen',
        dragClass: 'my-drag',
      }
    }
  }
}
</script>

<style scoped>
.top-right {
  position: absolute;
  top: 0;
  right: 0;
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
.my-chosen {
  background: deepskyblue;
}
.list-group-item {
  cursor: move;
}
</style>
