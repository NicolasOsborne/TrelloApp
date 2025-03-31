<script setup lang="ts">
import { useStore } from '../../store/store'
import type { TaskStatus } from '../../types/types'

const props = defineProps<{
  task: { id: number; title: string; status: TaskStatus }
}>()
const store = useStore()

const statuses: TaskStatus[] = ['À Faire', 'En Cours', 'À Approuver', 'Terminé']

const moveTask = (newStatus: TaskStatus) => {
  store.moveTask(props.task.id, newStatus)
}
</script>

<template>
  <div class="taskCard">
    <p>{{ task.title }}</p>
    <select
      :value="task.status"
      @change="
        moveTask(($event.target as HTMLSelectElement).value as TaskStatus)
      "
    >
      <option v-for="status in statuses" :key="status" :value="status">
        {{ status }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.taskCard {
  background: white;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;
}
select {
  padding: 5px;
  border-radius: 4px;
}
</style>
