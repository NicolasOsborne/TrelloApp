<script setup lang="ts">
import { computed } from 'vue'
import { taskStore } from '../../store/store'
import TaskCard from '../Molecules/TaskCard.vue'
import type { Task } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'

const props = defineProps<{ status: string; tasks: Task[] }>()
const emit = defineEmits(['removeColumn', 'editColumn'])
const store = taskStore()

const tasks = computed(() =>
  store.tasks.filter((task: any) => task.status === props.status)
)

const columnClass = (status: string) => {
  switch (status) {
    case 'À Faire':
      return 'column-toDo'
    case 'En Cours':
      return 'column-inProgress'
    case 'À Approuver':
      return 'column-toApprove'
    case 'Terminé':
      return 'column-done'
    default:
      return ''
  }
}

const removeColumn = () => {
  emit('removeColumn')
}

const editColumn = () => {
  const newName = prompt('Enter new column name:', props.status)
  if (newName) {
    emit('editColumn', newName)
  }
}
</script>

<template>
  <div class="column">
    <div :class="columnClass(props.status)">
      <h3>{{ props.status }}</h3>
      <div class="columnButtons">
        <BaseButton icon="bi bi-pen" :action="editColumn" variant="card-edit" />
        <BaseButton
          icon="bi bi-trash"
          :action="removeColumn"
          variant="card-remove"
        />
      </div>
    </div>

    <div class="taskList">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;
  background: $color-white;
  margin: 15px;
  width: 250px;

  &-toDo,
  &-inProgress,
  &-toApprove,
  &-done {
    width: 100%;
    border-radius: 8px;
    box-shadow: $box-shadow;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }

  &-toDo {
    background-color: $color-primary;
  }

  &-inProgress {
    background-color: $color-secondary;
  }

  &-toApprove {
    background-color: $color-tertiary;
  }

  &-done {
    background-color: $color-quarternary;
  }
}

.columnButtons {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.taskList {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
