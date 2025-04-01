<script setup lang="ts">
import { useStore } from '../../store/store'
import Column from '../Organisms/Column.vue'
import { TaskStatus } from '../../types/types'
import CTAButton from '../Atoms/CTAButton.vue'

const store = useStore()
const statuses = Object.values(TaskStatus)

const addTask = () => {
  const title = prompt('Nouvelle tâche :')
  if (title) store.addTask(title)
}
</script>

<template>
  <section class="kanban">
    <CTAButton :action="addTask" content="+ Ajouter une tâche" />
    <div class="columns">
      <Column v-for="status in statuses" :key="status" :status="status" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';

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
