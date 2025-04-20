import { defineStore } from 'pinia'
import {
  Role,
  TaskStatus,
  type ChecklistItem,
  type Column,
  type Task,
} from '../types/types'

export const taskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    loadTasks() {
      const storedTasks = localStorage.getItem('tasks')
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks)
      }
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    addTask(
      title: string,
      checklist: ChecklistItem[],
      status: string,
      role: Role,
      date: string
    ) {
      const newTask = { id: Date.now(), title, checklist, status, role, date }
      this.tasks = [...this.tasks, newTask]
      this.saveTasks()
    },
    moveTask(id: number, newStatus: TaskStatus) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id)
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], status: newStatus }
        this.saveTasks()
      }
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
      this.saveTasks()
    },
    updateTask(
      id: number,
      title: string,
      checklist: ChecklistItem[],
      status: string,
      role: Role,
      date: string
    ) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id)
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = {
          ...this.tasks[taskIndex],
          title,
          checklist,
          status,
          role,
          date,
        }
        this.saveTasks()
      }
    },
  },
})

export const columnStore = defineStore('columnStore', {
  state: () => ({
    columns: [] as Column[],
  }),
  actions: {
    loadColumns() {
      const storedColumns = localStorage.getItem('columns')
      if (storedColumns) {
        this.columns = JSON.parse(storedColumns)
      } else {
        this.columns = [
          { id: Date.now(), name: 'À Faire' },
          { id: Date.now() + 1, name: 'En Cours' },
          { id: Date.now() + 2, name: 'À Approuver' },
          { id: Date.now() + 3, name: 'Terminé' },
        ]
        this.saveColumns()
      }
    },
    saveColumns() {
      localStorage.setItem('columns', JSON.stringify(this.columns))
    },
    addColumn(columnName: string) {
      const newColumn = { id: Date.now(), name: columnName }
      this.columns.push(newColumn)
      this.saveColumns()
    },
    removeColumn(id: number) {
      const column = this.columns.find((c) => c.id === id)
      if (column) {
        const taskStoreInstance = taskStore()
        taskStoreInstance.tasks = taskStoreInstance.tasks.filter(
          (task) => task.status !== column.name
        )
        this.columns = this.columns.filter((c) => c.id !== id)
        taskStoreInstance.saveTasks()
        this.saveColumns()
      }
    },
    updateColumn(id: number, name: string) {
      const columnIndex = this.columns.findIndex((column) => column.id === id)
      if (columnIndex !== -1) {
        this.columns[columnIndex].name = name
        this.saveColumns()
      }
    },
  },
})
