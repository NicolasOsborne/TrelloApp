<script setup lang="ts">
import { useStore } from '../../store/store'
import Column from '../Organisms/Column.vue'
import { TaskStatus } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'
import { computed, ref } from 'vue'
import Modal from '../Molecules/Modal.vue'
import Input from '../Atoms/Input.vue'
import Select from '../Atoms/Select.vue'

const store = useStore()

// Convertir la liste enum en array pour l'utiliser dans la boucle v-for
const statuses = Object.values(TaskStatus)

const isModalOpen = ref(false)
const task = ref({ title: '', status: TaskStatus.toDo })

const statusOptions = statuses.map((status) => ({
  label: status,
  value: status,
}))

const openModal = () => {
  isModalOpen.value = true
}

const saveTask = () => {
  if (task.value.title.trim() !== '') {
    store.addTask(task.value.title, task.value.status)
    task.value = { title: '', status: TaskStatus.toDo }
    isModalOpen.value = false
  }
}

const tasksByStatus = computed(() => {
  return statuses.map((status) => ({
    status,
    tasks: store.tasks.filter((task) => task.status === status),
  }))
})
</script>

<template>
  <section class="kanban">
    <BaseButton
      content="+ Ajouter une tâche"
      :action="openModal"
      variant="cta"
    />
    <Modal :show="isModalOpen" @close="isModalOpen = false">
      <h3 class="modalTitle">Nouvelle tâche :</h3>
      <Input
        v-model="task.title"
        label="Titre :"
        placeholder="Titre de la nouvelle tâche..."
      />
      <Select v-model="task.status" :options="statusOptions" label="Statut :" />
      <BaseButton content="Créer la tâche" :action="saveTask" variant="cta" />
    </Modal>

    <div class="columns">
      <Column
        v-for="{ status, tasks } in tasksByStatus"
        :key="status"
        :status="status"
        :tasks="tasks"
      />
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
