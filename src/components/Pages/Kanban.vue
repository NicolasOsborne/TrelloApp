<script setup lang="ts">
import { useStore } from '../../store/store'
import Column from '../Organisms/Column.vue'
import { TaskStatus } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'

const store = useStore()
const statuses = Object.values(TaskStatus)

const addTask = () => {
  const title = prompt('Nouvelle tâche :')
  if (title) store.addTask(title)
}
</script>

<template>
  <section class="kanban">
    <BaseButton content="+ Ajouter une tâche" :action="addTask" variant="cta" />

    <div class="columns">
      <Column v-for="status in statuses" :key="status" :status="status" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.kanban {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.columns {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
}
</style>
