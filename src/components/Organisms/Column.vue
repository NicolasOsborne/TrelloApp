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
</script>

<template>
  <div class="column">
    <h3>{{ status }}</h3>
    <div class="taskList">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column {
  background: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
  width: 250px;
}
.taskList {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
