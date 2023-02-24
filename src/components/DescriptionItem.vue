<template>
  <div class="d-flex align-center">
    <div
      class="rounded-circle mr-2"
      :class="[statusClass]"
      style="width: 20px; height: 20px"
    />
    <div class="text-h6 text-grey">{{ label }}</div>
  </div>
  <div class="text-h5">
    <slot name="default" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  label: string;
  color: string;
}>();

const statusClass = computed(() => `bg-${props.color}`);
</script>

<style scoped></style>
