<script setup lang="ts">
import { computed, ref } from 'vue'
import { columnStore, taskStore } from '../../store/store'
import TaskCard from '../Molecules/TaskCard.vue'
import type { Task } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'
import Modal from '../Molecules/Modal.vue'
import Input from '../Atoms/Input.vue'

const props = defineProps<{ id: number; status: string; tasks: Task[] }>()
const emit = defineEmits(['removeColumn', 'editColumn'])

const taskStoreInstance = taskStore()
const columnStoreInstance = columnStore()

const tasks = computed(() =>
  taskStoreInstance.tasks.filter((task: any) => task.status === props.status)
)

const isEditColumnModalOpen = ref(false)
const isDeleteColumnModalOpen = ref(false)

const columnNewName = ref('')

const columnColor = computed(() => {
  const column = columnStoreInstance.columns.find(
    (col) => col.name === props.status
  )
  return column ? column.color : '#fa8181'
})

const openEditColumnModal = () => {
  columnNewName.value = props.status
  isEditColumnModalOpen.value = true
}

const closeEditColumnModal = () => {
  isEditColumnModalOpen.value = false
}

const openDeleteColumnModal = () => {
  isDeleteColumnModalOpen.value = true
}

const closeDeleteColumnModal = () => {
  isDeleteColumnModalOpen.value = false
}

const editColumn = () => {
  emit('editColumn', { id: props.id, newName: columnNewName.value })
  closeEditColumnModal()
}

const removeColumn = () => {
  emit('removeColumn', props.id)
  closeDeleteColumnModal()
}
</script>

<template>
  <div class="column">
    <div class="column_header" :style="{ backgroundColor: columnColor }">
      <h3>{{ props.status }}</h3>
      <div class="columnButtons">
        <BaseButton
          icon="bi bi-pen"
          :action="openEditColumnModal"
          variant="card-edit"
        />
        <BaseButton
          icon="bi bi-trash"
          :action="openDeleteColumnModal"
          variant="card-remove"
        />
      </div>
    </div>

    <div class="taskList">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :statusColor="columnColor"
      />
    </div>
  </div>

  <Modal :show="isEditColumnModalOpen" @close="closeEditColumnModal">
    <h3 class="modalTitle">Modifier la colonne :</h3>
    <Input v-model="columnNewName" label="Nom de la colonne :" />
    <BaseButton
      content="Mettre à jour la colonne"
      :action="editColumn"
      variant="cta"
    />
  </Modal>

  <Modal
    :show="isDeleteColumnModalOpen"
    @close="isDeleteColumnModalOpen = false"
  >
    <h3 class="modalTitle">
      Êtes-vous sûr de vouloir supprimer cette colonne (et toutes les tâches
      associées) ?
    </h3>
    <BaseButton content="Supprimer" :action="removeColumn" variant="cta" />
    <BaseButton
      content="Annuler"
      :action="closeDeleteColumnModal"
      variant="cta"
    />
  </Modal>
</template>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: $color-white;
  padding: 1rem;
  min-width: 300px;
  min-height: 400px;
  border-radius: 8px;
  box-shadow: $box-shadow;
  border: 2px solid $color-black;
  margin-bottom: 5rem;

  &_header {
    border-radius: 8px;
    box-shadow: $box-shadow;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }
}

.columnButtons {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.taskList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
}
</style>
