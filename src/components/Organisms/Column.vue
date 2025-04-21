<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { taskStore } from '../../store/store'
import TaskCard from '../Molecules/TaskCard.vue'
import type { Task } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'
import Modal from '../Molecules/Modal.vue'
import Input from '../Atoms/Input.vue'
import Draggable from 'vuedraggable'

const props = defineProps<{ id: number; status: string; tasks: Task[] }>()
const emit = defineEmits(['removeColumn', 'editColumn'])
const store = taskStore()

const tasks = computed(() =>
  store.tasks.filter((task: any) => task.status === props.status)
)

const isEditColumnModalOpen = ref(false)
const isDeleteColumnModalOpen = ref(false)

const columnNewName = ref('')

const columnClass = (status: string) => {
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

const onDrop = (event: any) => {
  const movedTask: Task = event?.item ? event.item._underlying_vm_ : null

  if (movedTask) {
    store.moveTask(movedTask.id, props.status)
  }
}
</script>

<template>
  <div class="column">
    <div :class="columnClass(props.status)">
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

    <Draggable :list="tasks" item-key="id" @change="onDrop">
      <template #item="{ element }">
        <TaskCard :task="element" />
      </template>
    </Draggable>
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
      Êtes-vous sûrs de vouloir supprimer cette colonne ?
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
  background: $color-white;
  margin: 15px;
  width: 250px;
  height: 400px;

  &-toDo,
  &-inProgress,
  &-toApprove,
  &-done {
    width: 100%;
    border-radius: 8px;
    box-shadow: $box-shadow;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }

  &-toDo {
    background-color: $color-primary;
  }

  &-inProgress {
    background-color: $color-secondary;
  }

  &-toApprove {
    background-color: $color-tertiary;
  }

  &-done {
    background-color: $color-quarternary;
  }
}

.columnButtons {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.taskList {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
