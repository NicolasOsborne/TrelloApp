import { defineStore } from 'pinia'
import { colors, type Column, type Task } from '../types/types'

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
    addTask(task: Omit<Task, 'id'>) {
      const newTask = { id: Date.now(), ...task }
      this.tasks = [...this.tasks, newTask]
      this.saveTasks()
    },
    moveTask(id: number, newStatus: string) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id)
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = {
          ...this.tasks[taskIndex],
          status: newStatus,
        }
        this.saveTasks()
      }
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
      this.saveTasks()
    },
    updateTask(updatedTask: Task) {
      const taskIndex = this.tasks.findIndex(
        (task) => task.id === updatedTask.id
      )
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask
        this.saveTasks()
      }
    },
  },
  getters: {
    tasksByStatus: (state) => (status: string) => {
      return state.tasks.filter((task) => task.status === status)
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
          { id: Date.now(), name: 'À Faire', color: colors[0] },
          { id: Date.now() + 1, name: 'En Cours', color: colors[1] },
          { id: Date.now() + 2, name: 'À Approuver', color: colors[2] },
          { id: Date.now() + 3, name: 'Terminé', color: colors[3] },
        ]
        this.saveColumns()
      }
    },
    saveColumns() {
      localStorage.setItem('columns', JSON.stringify(this.columns))
    },
    addColumn(columnName: string) {
      const randomIndex = Math.floor(Math.random() * colors.length)
      const newColumn = {
        id: Date.now(),
        name: columnName,
        color: colors[randomIndex],
      }
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
  getters: {
    columnById: (state) => (id: number) => {
      return state.columns.find((column) => column.id === id)
    },
    getColumnColor: (state) => (name: string) => {
      const column = state.columns.find((col) => col.name === name)
      return column ? column.color : '#fa8181'
    },
  },
})
