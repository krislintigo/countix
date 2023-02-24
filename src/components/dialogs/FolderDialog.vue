<template>
  <v-dialog v-model="isOpen" max-width="600px">
    <v-card class="pa-3">
      <v-card-title class="text-h5">Информация о папке</v-card-title>
      <v-col @keydown.enter="$emit('save', _folder)">
        <v-text-field
          v-model="_folder.name"
          variant="outlined"
          label="Название"
        />
      </v-col>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red-darken-1" variant="text" @click="isOpen = false">
          Назад
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          @click="
            $emit('save', _folder);
            isOpen = false;
          "
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { IFolderData } from '@/stores/folder.store';

const props = defineProps<{
  modelValue: boolean;
  folder: IFolderData;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:folder', value: IFolderData): void;
  (e: 'save', value: IFolderData): void;
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const _folder = computed({
  get: () => props.folder,
  set: (value) => emit('update:folder', value),
});
</script>

<style scoped></style>
