<script setup lang="ts">
import { columnStore, taskStore } from '../../store/store'
import Column from '../Organisms/Column.vue'
import { Role, roleInfo, TaskStatus, type Task } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Modal from '../Molecules/Modal.vue'
import CustomInput from '../Atoms/CustomInput.vue'
import CustomSelect from '../Atoms/CustomSelect.vue'
import Checklist from '../Molecules/Checklist.vue'

const taskStoreInstance = taskStore()
const columnStoreInstance = columnStore()

const isTaskModalOpen = ref(false)
const isColumnModalOpen = ref(false)

const task = ref<Omit<Task, 'id'>>({
  title: '',
  checklist: [],
  status: TaskStatus.toDo,
  role: Role.frontend,
  date: '',
})

const newColumnName = ref('')

const statusOptions = computed(() => {
  return columnStoreInstance.columns.map((column) => ({
    label: column.name,
    value: column.name,
    color: column.color,
  }))
})

const roleOptions = Object.values(Role).map((role) => ({
  label: role,
  value: role,
  color: roleInfo[role].color,
}))

onMounted(() => {
  taskStoreInstance.loadTasks()
  columnStoreInstance.loadColumns()
})

onBeforeUnmount(() => {
  taskStoreInstance.saveTasks()
  columnStoreInstance.saveColumns()
})

const saveTask = () => {
  if (task.value.title.trim() !== '' && task.value.status) {
    taskStoreInstance.addTask(task.value)
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
</script>

<template>
  <section class="kanban">
    <div class="kanbanButtons">
      <BaseButton
        content="Nouvelle tâche"
        :action="() => (isTaskModalOpen = true)"
        variant="cta"
      />
      <BaseButton
        content="Nouvelle colonne"
        :action="() => (isColumnModalOpen = true)"
        variant="cta"
      />
    </div>

    <Modal :show="isTaskModalOpen" @close="isTaskModalOpen = false">
      <h3 class="modalTitle">Nouvelle tâche :</h3>
      <CustomInput
        v-model="task.title"
        label="Titre :"
        placeholder="Titre de la nouvelle tâche..."
      />
      <Checklist
        :checklist="task.checklist"
        :onUpdate="(updatedChecklist) => (task.checklist = updatedChecklist)"
        label="Checklist :"
      />
      <div class="modal-selects">
        <CustomSelect
          v-model="task.status"
          :options="statusOptions"
          label="Statut :"
        />
        <CustomSelect
          v-model="task.role"
          :options="roleOptions"
          label="Rôle :"
        />
      </div>

      <CustomInput v-model="task.date" type="date" label="Date d'échéance :" />
      <BaseButton content="Créer la tâche" :action="saveTask" variant="cta" />
    </Modal>

    <Modal :show="isColumnModalOpen" @close="isColumnModalOpen = false">
      <h3 class="modalTitle">Nouvelle colonne :</h3>
      <CustomInput
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
        @removeColumn="columnStoreInstance.removeColumn"
        @editColumn="
          (payload) =>
            columnStoreInstance.updateColumn(payload.id, payload.newName)
        "
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.kanban {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
  margin-bottom: 8rem;
  padding: 0 2rem;
}

.kanbanButtons {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
}
.columns {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 2rem;
  gap: 2rem;
  overflow-x: auto;
  scrollbar-width: none;
}
</style>
