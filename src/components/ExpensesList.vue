<template>
  <draggable v-model="basicExpenses" v-bind="dragOptions" @start="drag = true" @end="drag = false">
    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      <ExpenseItem
        v-for="(expense, index) in basicExpenses"
        :index="index"
        :key="expense.id"
        @edit="$emit('edit', expense)"
      />
      <v-expansion-panels popout multiple :key="111" class="mb-3">
        <v-expansion-panel v-for="(item, i) in 5" :key="i">
          <v-expansion-panel-header>Item {{i}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{item}}
            kjshdf  kejrt kerhgsd hfjkg herkj bhefbgjksd fgkj dfgkjfdgfkljs dkfjbsdjk gjk sdfgjksdfhg jk h sdf
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </transition-group>
  </draggable>
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
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'my-ghost',
      }
    }
  }
}
</script>

<style scoped>
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
