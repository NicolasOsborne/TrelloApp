<script setup lang="ts">
import { columnStore, taskStore } from '../../store/store'
import Column from '../Organisms/Column.vue'
import { Role, type ChecklistItem } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'
import { computed, onMounted, ref } from 'vue'
import Modal from '../Molecules/Modal.vue'
import Input from '../Atoms/Input.vue'
import Select from '../Atoms/Select.vue'
import Checklist from '../Molecules/Checklist.vue'

const taskStoreInstance = taskStore()
const columnStoreInstance = columnStore()

const isTaskModalOpen = ref(false)
const isColumnModalOpen = ref(false)

const task = ref<{
  title: string
  checklist: ChecklistItem[]
  status: string
  role: Role
  date: string
}>({
  title: '',
  checklist: [],
  status: '',
  role: Role.frontend,
  date: '',
})

const newColumnName = ref('')

const statusOptions = computed(() => {
  return columnStoreInstance.columns.map((column) => ({
    label: column.name,
    value: column.name,
  }))
})

const roleOptions = Object.values(Role).map((role) => ({
  label: role,
  value: role,
}))

const tasksByStatus = computed(() => {
  return columnStoreInstance.columns.map((column) => ({
    status: column.name,
    tasks: taskStoreInstance.tasks.filter(
      (task) => task.status === column.name
    ),
  }))
})

onMounted(() => {
  taskStoreInstance.loadTasks()
  columnStoreInstance.loadColumns()
})

const openTaskModal = () => {
  isTaskModalOpen.value = true
}

const openColumnModal = () => {
  isColumnModalOpen.value = true
}

const saveTask = () => {
  if (task.value.title.trim() !== '' && task.value.status) {
    taskStoreInstance.addTask(
      task.value.title,
      task.value.checklist,
      task.value.status,
      task.value.role,
      task.value.date
    )
    task.value = {
      title: '',
      checklist: [],
      status: '',
      role: Role.frontend,
      date: '',
    }
    isTaskModalOpen.value = false
  }
}

const saveColumn = () => {
  if (newColumnName.value.trim() !== '') {
    columnStoreInstance.addColumn(newColumnName.value)
    newColumnName.value = ''
    isColumnModalOpen.value = false
  }
}

const removeColumn = (id: number) => {
  columnStoreInstance.removeColumn(id)
}

const editColumn = ({ id, newName }: { id: number; newName: string }) => {
  columnStoreInstance.updateColumn(id, newName)
}

const updateChecklist = (updatedChecklist: ChecklistItem[]) => {
  task.value.checklist = updatedChecklist
}
</script>

<template>
  <section class="kanban">
    <div class="kanbanButtons">
      <BaseButton
        content="Nouvelle tâche"
        :action="openTaskModal"
        variant="cta"
      />
      <BaseButton
        content="Nouvelle colonne"
        :action="openColumnModal"
        variant="cta"
      />
    </div>

    <Modal :show="isTaskModalOpen" @close="isTaskModalOpen = false">
      <h3 class="modalTitle">Nouvelle tâche :</h3>
      <Input
        v-model="task.title"
        label="Titre :"
        placeholder="Titre de la nouvelle tâche..."
      />
      <Checklist :checklist="task.checklist" :onUpdate="updateChecklist" />
      <Select v-model="task.status" :options="statusOptions" label="Statut :" />
      <Select v-model="task.role" :options="roleOptions" label="Rôle :" />
      <Input v-model="task.date" type="date" label="Date d'échéance :" />
      <BaseButton content="Créer la tâche" :action="saveTask" variant="cta" />
    </Modal>

    <Modal :show="isColumnModalOpen" @close="isColumnModalOpen = false">
      <h3 class="modalTitle">Nouvelle colonne :</h3>
      <Input
        v-model="newColumnName"
        label="Nom de la colonne :"
        placeholder="Nom de la nouvelle colonne..."
      />
      <BaseButton
        content="Créer la colonne"
        :action="saveColumn"
        variant="cta"
      />
    </Modal>

    <div class="columns">
      <Column
        v-for="column in columnStoreInstance.columns"
        :key="column.id"
        :id="column.id"
        :status="column.name"
        :tasks="
          tasksByStatus.find((taskGroup) => taskGroup.status === column.name)
            ?.tasks || []
        "
        @removeColumn="removeColumn(column.id)"
        @editColumn="editColumn"
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
  margin-top: 2rem;
}

.kanbanButtons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4rem;
}
.columns {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
}
</style>
