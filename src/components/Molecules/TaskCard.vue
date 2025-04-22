<script setup lang="ts">
import { computed, ref } from 'vue'
import { columnStore, taskStore } from '../../store/store'
import type { ChecklistItem, Task } from '../../types/types'
import { Role } from '../../types/types'
import BaseButton from '../Atoms/BaseButton.vue'
import Select from '../Atoms/Select.vue'
import Modal from './Modal.vue'
import Input from '../Atoms/Input.vue'
import Checklist from './Checklist.vue'

const props = defineProps<{ task: Task; statusColor: string }>()
const store = taskStore()

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
}))

const roleStyles = {
  [Role.frontend]: { initials: 'FE', color: '#a9a2ff' },
  [Role.backend]: { initials: 'BA', color: '#ff9ab0' },
  [Role.fullStack]: { initials: 'FS', color: '#ffa2fa' },
  [Role.designer]: { initials: 'UX', color: '#fa8181' },
  [Role.owner]: { initials: 'PO', color: '#b9ff80' },
  [Role.scrum]: { initials: 'SM', color: '#72f5e3' },
}

const roleStyle = computed(() => roleStyles[props.task.role])

const isEditTaskModalOpen = ref(false)
const isDeleteTaskModalOpen = ref(false)

const editedTitle = ref(props.task.title)
const editedChecklist = ref<ChecklistItem[]>(props.task.checklist)
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

const isStatusDropdownOpen = ref(false)

const toggleStatusDropdown = () => {
  isStatusDropdownOpen.value = !isStatusDropdownOpen.value
}

const selectStatus = (status: string) => {
  editedStatus.value = status
  store.moveTask(props.task.id, status)
  isStatusDropdownOpen.value = false
}

const openEditTaskModal = () => {
  editedTitle.value = props.task.title
  editedChecklist.value = props.task.checklist
  editedStatus.value = props.task.status
  editedRole.value = props.task.role
  editedDate.value = props.task.date

  isEditTaskModalOpen.value = true
}

const openDeleteTaskModal = () => {
  isDeleteTaskModalOpen.value = true
}

const closeDeleteTaskModal = () => {
  isDeleteTaskModalOpen.value = false
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
  isEditTaskModalOpen.value = false
}

const removeTask = () => {
  store.removeTask(props.task.id)
}

const updateChecklist = (updatedChecklist: ChecklistItem[]) => {
  editedChecklist.value = updatedChecklist
}
</script>

<template>
  <div class="taskCard" :data-id="task.id">
    <div class="taskCard_header">
      <div
        class="taskCard_header-status"
        :style="{ backgroundColor: statusColor }"
        @click="toggleStatusDropdown"
      >
        {{ task.status }}
      </div>
      <div class="taskCard_header-actions">
        <BaseButton
          icon="bi bi-pen"
          :action="openEditTaskModal"
          variant="card-edit"
        />
        <BaseButton
          icon="bi bi-trash"
          :action="openDeleteTaskModal"
          variant="card-remove"
        />
      </div>
    </div>

    <div v-if="isStatusDropdownOpen" class="taskCard_header-status-dropdown">
      <div
        v-for="status in statusOptions"
        :key="status.value"
        class="taskCard_header-status-option"
        :style="{ backgroundColor: status.color }"
        @click="selectStatus(status.value)"
      >
        {{ status.label }}
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
        {{ roleStyle.initials }}
      </div>
    </div>
  </div>
  <Modal :show="isEditTaskModalOpen" @close="isEditTaskModalOpen = false">
    <h3 class="modalTitle">Modifier la tâche :</h3>
    <Input v-model="editedTitle" label="Titre :" />
    <Checklist
      :checklist="editedChecklist"
      :onUpdate="updateChecklist"
      label="Checklist :"
    />
    <div class="modal-selects">
      <Select
        v-model="editedStatus"
        :options="statusOptions"
        label="Statut :"
      />
      <Select v-model="editedRole" :options="roleOptions" label="Rôle :" />
    </div>
    <Input
      v-model="editedDate"
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
      :action="closeDeleteTaskModal"
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

    &-status {
      padding: 0.25rem 0.5rem;
      border: 1px solid $color-black;
      border-radius: 4px;
      box-shadow: $box-shadow;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: translate($box-shadow-x, $box-shadow-y);
        box-shadow: none;
      }

      &-dropdown {
        position: absolute;
        background-color: $color-background;
        padding: 0.75rem;
        border: 2px solid $color-black;
        border-radius: 8px;
        box-shadow: $box-shadow;
        z-index: 10;
        margin-top: 2.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      &-option {
        padding: 0.25rem 0.5rem;
        border: 1px solid $color-black;
        border-radius: 4px;
        box-shadow: $box-shadow;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          transform: translate($box-shadow-x, $box-shadow-y);
          box-shadow: none;
        }
      }
    }

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

select {
  padding: 5px;
  border-radius: 4px;
  width: max-content;
}
</style>
