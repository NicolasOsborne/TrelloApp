<script setup lang="ts">
import { useStore } from '../../store/store'
import Column from '../Organisms/Column.vue'
import type { TaskStatus } from '../../types/types'

const store = useStore()
const statuses: TaskStatus[] = ['À Faire', 'En Cours', 'À Approuver', 'Terminé']

const addTask = () => {
  const title = prompt('Nouvelle tâche :')
  if (title) store.addTask(title)
}
</script>

<template>
  <section class="kanban">
    <button @click="addTask">Nouvelle tâche</button>
    <div class="columns">
      <Column v-for="status in statuses" :key="status" :status="status" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.kanban {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.columns {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}
</style>
