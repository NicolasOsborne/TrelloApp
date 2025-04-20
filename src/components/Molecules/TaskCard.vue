<script setup lang="ts">
import { computed, ref } from 'vue'
import { taskStore } from '../../store/store'
import type { Task } from '../../types/types'
import { Role, TaskStatus } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'
import Select from '../Atoms/Select.vue'
import Modal from './Modal.vue'
import Input from '../Atoms/Input.vue'
import Checklist from './Checklist.vue'

const props = defineProps<{ task: Task }>()
const store = taskStore()

const statuses = Object.values(TaskStatus)
const roles = Object.values(Role)

const statusOptions = statuses.map((status) => ({
  label: status,
  value: status,
}))

const roleOptions = roles.map((role) => ({
  label: role,
  value: role,
}))

const isModalOpen = ref(false)
const editedTitle = ref(props.task.title)
const editedChecklist = ref(props.task.checklist)
const editedStatus = ref(props.task.status)
const editedRole = ref(props.task.role)
const editedDate = ref(props.task.date)

const daysRemaining = () => {
  const today = new Date()
  const dueDate = new Date(props.task.date)
  const timeDiff = dueDate.getTime() - today.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

const checklistProgress = computed(() => {
  const total = props.task.checklist.length
  const completed = props.task.checklist.filter((item) => item.completed).length
  return `${completed}/${total}`
})

const openEditModal = () => {
  editedTitle.value = props.task.title
  editedChecklist.value = props.task.checklist
  editedStatus.value = props.task.status
  editedRole.value = props.task.role
  editedDate.value = props.task.date

  isModalOpen.value = true
}

const saveUpdatedTask = () => {
  store.updateTask(
    props.task.id,
    editedTitle.value,
    editedChecklist.value,
    editedStatus.value,
    editedRole.value,
    editedDate.value
  )
  isModalOpen.value = false
}

const moveTask = (newStatus: TaskStatus) => {
  store.moveTask(props.task.id, newStatus)
}

const removeTask = () => {
  store.removeTask(props.task.id)
}

const updateChecklist = (updatedChecklist) => {
  task.value.checklist = updatedChecklist
}
</script>

<template>
  <div class="taskCard">
    <p class="taskCard_title">{{ task.title }}</p>
    <div class="taskCard_content">
      <p class="taskCard_status">{{ task.status }}</p>
      <p class="taskCard_checklistProgress">{{ checklistProgress }}</p>
      <p class="taskCard_dueDate">{{ daysRemaining() }} jours</p>

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
    <Checklist :checklist="task.checklist" @onUpdate="updateChecklist" />
    <Select v-model="editedStatus" :options="statusOptions" label="Statut :" />
    <Select v-model="editedRole" :options="roleOptions" label="Rôle :" />
    <Input v-model="editedDate" type="date" label="Date d'échéance :" />
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
    font-weight: 600;
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
