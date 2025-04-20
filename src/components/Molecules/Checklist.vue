<script setup lang="ts">
import { ref } from 'vue'
import type { ChecklistItem } from '../../types/types'

const props = defineProps<{
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
  <div class="checklist">
    <h4>Checklist</h4>
    <div v-for="(item, index) in checklist" :key="index" class="checklist-item">
      <input type="checkbox" v-model="item.completed" />
      <span>{{ item.text }}</span>
      <button @click="removeItem(index)">Remove</button>
    </div>
    <input
      v-model="newItem"
      placeholder="Add a checklist item"
      @keyup.enter="addItem"
    />
    <button @click="addItem">Add</button>
  </div>
</template>

<style lang="scss" scoped>
.checklist {
  margin-top: 10px;
}
.checklist-item {
  display: flex;
  align-items: center;
}
.checklist-item button {
  margin-left: 10px;
}
</style>
