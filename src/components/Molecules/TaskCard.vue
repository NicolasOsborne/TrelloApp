<script setup lang="ts">
import { useStore } from '../../store/store'
import type { Task, TaskStatus } from '../../types/types'
import ActionButton from '../Atoms/ActionButton.vue'

const props = defineProps<{ task: Task }>()
const store = useStore()

const statuses: TaskStatus[] = ['À Faire', 'En Cours', 'À Approuver', 'Terminé']

const moveTask = (newStatus: TaskStatus) => {
  store.moveTask(props.task.id, newStatus)
}

const removeTask = () => {
  store.removeTask(props.task.id)
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
    <div class="actions">
      <ActionButton content="bi bi-trash" :action="removeTask" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';
.taskCard {
  background: $color-white;
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
  width: max-content;
}
.actions {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
</style>
