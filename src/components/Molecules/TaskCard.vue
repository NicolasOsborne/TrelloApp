<script setup lang="ts">
import { useStore } from '../../store/store'
import type { Task } from '../../types/types'
import { TaskStatus } from '../../types/types'

import CardButton from '../Atoms/CardButton.vue'
import Select from '../Atoms/Select.vue'

const props = defineProps<{ task: Task }>()
const store = useStore()

const statuses = Object.values(TaskStatus)

const statusOptions = statuses.map((status) => ({
  label: status,
  value: status,
}))

const moveTask = (newStatus: TaskStatus) => {
  store.moveTask(props.task.id, newStatus)
}

const removeTask = () => {
  store.removeTask(props.task.id)
}
</script>

<template>
  <div class="taskCard">
    <p class="taskCard_title">{{ task.title }}</p>
    <div class="taskCard_content">
      <Select
        v-model="task.status"
        :options="statusOptions"
        label="Statut :"
        @update:value="moveTask"
      />
      <div class="actions">
        <CardButton content="bi bi-trash" :action="removeTask" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';
.taskCard {
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 6px;
  border: 2px solid $color-black;
  box-shadow: $box-shadow;
  display: flex;
  flex-direction: column;
  gap: 5px;

  &_title {
    font-weight: 500;
  }

  &_content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
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
