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
  <section class="kanban">
    <button @click="addTask">Nouvelle tâche</button>
    <div class="columns">
      <Column
        v-for="status in statuses"
        :key="status"
        :status="status"
        :class="columnClass(status)"
      />
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

  .column-toDo {
    background-color: $color-primary;
  }

  .column-inProgress {
    background-color: $color-secondary;
  }

  .column-toApprove {
    background-color: $color-tertiary;
  }

  .column-done {
    background-color: $color-quarternary;
  }
}
</style>
