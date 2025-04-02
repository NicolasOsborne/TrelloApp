<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../../store/store'
import type { Task } from '../../types/types'
import { TaskStatus } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'
import Select from '../Atoms/Select.vue'
import Modal from './Modal.vue'
import Input from '../Atoms/Input.vue'

const props = defineProps<{ task: Task }>()
const store = useStore()

const statuses = Object.values(TaskStatus)

const statusOptions = statuses.map((status) => ({
  label: status,
  value: status,
}))

const isModalOpen = ref(false)
const editedTitle = ref(props.task.title)
const editedStatus = ref(props.task.status)

const openEditModal = () => {
  editedTitle.value = props.task.title
  editedStatus.value = props.task.status
  isModalOpen.value = true
}

const saveUpdatedTask = () => {
  store.editTask(props.task.id, editedTitle.value, editedStatus.value)
  isModalOpen.value = false
}

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
        @update:modelValue="moveTask"
      />

      <div class="actions">
        <BaseButton
          icon="bi bi-pen"
          :action="openEditModal"
          variant="card-edit"
        />
        <BaseButton
          icon="bi bi-trash"
          :action="removeTask"
          variant="card-remove"
        />
      </div>
    </div>
  </div>
  <Modal :show="isModalOpen" @close="isModalOpen = false">
    <h3 class="modalTitle">Modifier la tâche :</h3>
    <Input v-model="editedTitle" label="Titre :" />
    <Select v-model="editedStatus" :options="statusOptions" label="Statut :" />
    <BaseButton content="Modifier" :action="saveUpdatedTask" variant="cta" />
  </Modal>
</template>

<style lang="scss" scoped>
.taskCard {
  width: 100%;
  background-color: $color-background;
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
  gap: 0.5rem;
}
</style>
