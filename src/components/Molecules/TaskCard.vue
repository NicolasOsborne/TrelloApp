<script setup lang="ts">
import { computed, ref } from 'vue'
import { columnStore, taskStore } from '../../store/store'
import type { Task } from '../../types/types'
import { Role, roleInfo } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'
import CustomSelect from '../Atoms/CustomSelect.vue'
import Modal from './Modal.vue'
import CustomInput from '../Atoms/CustomInput.vue'
import Checklist from './Checklist.vue'

const props = defineProps<{ task: Task; statusColor: string }>()

const taskStoreInstance = taskStore()
const columnStoreInstance = columnStore()

const statusOptions = computed(() => {
  return columnStoreInstance.columns.map((column) => ({
    label: column.name,
    value: column.name,
    color: column.color,
  }))
})

const roles = Object.values(Role)

const roleOptions = roles.map((role) => ({
  label: role,
  value: role,
  color: roleInfo[role].color,
}))

const roleStyle = computed(() => roleInfo[props.task.role])

const isEditTaskModalOpen = ref(false)
const isDeleteTaskModalOpen = ref(false)

const editedTask = ref({ ...props.task })

const saveUpdatedTask = () => {
  taskStoreInstance.updateTask(editedTask.value)
  isEditTaskModalOpen.value = false
}

const removeTask = () => {
  taskStoreInstance.removeTask(props.task.id)
}

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

const getRoleAbbreviation = (role: Role) => {
  return role.slice(0, 2).toUpperCase()
}
</script>

<template>
  <div class="taskCard" :data-id="task.id">
    <div class="taskCard_header">
      <CustomSelect
        v-model="task.status"
        :options="statusOptions"
        margin="2.5rem"
      />
      <div class="taskCard_header-actions">
        <BaseButton
          icon="bi bi-pen"
          :action="() => (isEditTaskModalOpen = true)"
          variant="card-edit"
        />
        <BaseButton
          icon="bi bi-trash"
          :action="() => (isDeleteTaskModalOpen = true)"
          variant="card-remove"
        />
      </div>
    </div>

    <p class="taskCard_title">{{ task.title }}</p>
    <div class="taskCard_info">
      <div class="taskCard_info-progress">
        <i class="bi bi-check2-square"></i>
        <span class="taskCard_info-progress-text">{{ checklistProgress }}</span>
      </div>
      <div class="taskCard_info-date">
        <i class="bi bi-hourglass"></i>
        <span class="taskCard_info-date-text">{{ daysRemaining() }} jours</span>
      </div>
      <div
        class="taskCard_info-role"
        :style="{ backgroundColor: roleStyle.color }"
      >
        {{ getRoleAbbreviation(task.role) }}
      </div>
    </div>
  </div>
  <Modal :show="isEditTaskModalOpen" @close="isEditTaskModalOpen = false">
    <h3 class="modalTitle">Modifier la tâche :</h3>
    <CustomInput v-model="editedTask.title" label="Titre :" />
    <Checklist
      :checklist="editedTask.checklist"
      :onUpdate="
        (updatedChecklist) => (editedTask.checklist = updatedChecklist)
      "
      label="Checklist :"
    />
    <div class="modal-selects">
      <CustomSelect
        v-model="editedTask.status"
        :options="statusOptions"
        label="Statut :"
      />
      <CustomSelect
        v-model="editedTask.role"
        :options="roleOptions"
        label="Rôle :"
      />
    </div>
    <CustomInput
      v-model="editedTask.date"
      type="date"
      label="Date d'échéance :"
      class="modal-dateSelect"
    />
    <BaseButton content="Modifier" :action="saveUpdatedTask" variant="cta" />
  </Modal>

  <Modal :show="isDeleteTaskModalOpen" @close="isDeleteTaskModalOpen = false">
    <h3 class="modalTitle">Êtes-vous sûr de vouloir supprimer cette tâche ?</h3>
    <BaseButton content="Supprimer" :action="removeTask" variant="cta" />
    <BaseButton
      content="Annuler"
      :action="() => (isDeleteTaskModalOpen = false)"
      variant="cta"
    />
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

  &_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &-actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
    }
  }

  &_title {
    font-weight: 600;
    font-size: 1.1rem;
  }

  &_info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &-progress {
      padding: 0.5rem;
      border: 2px solid $color-black;
      border-radius: 4px;
      background-color: $color-green;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
    }

    &-date {
      padding: 0.5rem;
      border: 2px solid $color-black;
      border-radius: 4px;
      background-color: $color-tertiary;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
    }

    &-role {
      padding: 0.5rem;
      border-radius: 99%;
      border: 2px solid $color-black;
      background-color: $color-secondary;
      font-weight: 600;
    }
  }
}
</style>
