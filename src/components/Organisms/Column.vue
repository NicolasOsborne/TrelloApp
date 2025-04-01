<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../../store/store'
import TaskCard from '../Molecules/TaskCard.vue'
import type { TaskStatus } from '../../types/types'

const props = defineProps<{ status: TaskStatus }>()
const store = useStore()

const tasks = computed(() =>
  store.tasks.filter((t: any) => t.status === props.status)
)

const columnClass = (status: TaskStatus) => {
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
</script>

<template>
  <div class="column">
    <div :class="columnClass(status)">
      <h3>{{ status }}</h3>
    </div>

    <div class="taskList">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';
.column {
  display: flex;
  flex-direction: column;
  background: $color-white;
  padding: 15px;
  width: 250px;

  &-toDo,
  &-inProgress,
  &-toApprove,
  &-done {
    width: 100%;
    border-radius: 8px;
    box-shadow: $box-shadow;
    display: flex;
    align-items: center;
    justify-content: center;
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
.taskList {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
