<script setup lang="ts">
import { ref } from 'vue'
import type { ChecklistItem } from '../../types/types'

const props = defineProps<{
  label: string
  checklist: ChecklistItem[]
  onUpdate: (checklist: ChecklistItem[]) => void
}>()

const newItem = ref('')

const addItem = () => {
  if (newItem.value.trim() !== '') {
    props.checklist.push({ text: newItem.value, completed: false })
    newItem.value = ''
    props.onUpdate(props.checklist)
  }
}

const removeItem = (index: number) => {
  props.checklist.splice(index, 1)
  props.onUpdate(props.checklist)
}
</script>

<template>
  <div class="checklist_wrapper">
    <label class="checklist_label" for="input">{{ label }}</label>
    <div class="checklist_add">
      <input
        v-model="newItem"
        placeholder="Ajouter un élément..."
        @keyup.enter="addItem"
      />
      <button @click="addItem" class="button checklist_add-button">
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
    <div v-for="(item, index) in checklist" :key="index" class="checklist_item">
      <div class="checklist_item-input">
        <input
          type="checkbox"
          v-model="item.completed"
          class="checklist_item-checkbox"
        />
        <span :class="{ completed: item.completed }">{{ item.text }}</span>
      </div>
      <button @click="removeItem(index)" class="button checklist_item-remove">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checklist_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;

  label {
    font-family: $font-title;
    font-weight: 500;
  }

  input {
    width: 75%;
    height: 1rem;
    border-radius: 8px;
    border: 2px solid $color-black;
    padding: 10px;
    font-family: $font-body;
    outline: 2px solid transparent;
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: 2px solid $color-green;
    }
  }

  .checklist_add {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &-button {
      cursor: pointer;
      padding: 0.25rem 0.35rem;
      background-color: $color-green;
      margin-left: 1rem;
    }
  }

  .checklist_item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &-remove {
      margin-left: 1rem;
      padding: 0.25rem 0.35rem;
      background-color: $color-red;
      cursor: pointer;

      i {
        font-size: 0.5rem;
      }
    }

    &-input {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &-checkbox {
      accent-color: $color-green;
      width: max-content;
      margin-right: 0.5rem;
    }

    .completed {
      text-decoration: line-through;
      color: gray;
    }
  }
}
</style>
