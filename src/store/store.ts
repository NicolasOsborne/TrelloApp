import { defineStore } from 'pinia'
import { TaskStatus, type Task } from '../types/types'

export const taskStore = defineStore('store', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    addTask(title: string, status: TaskStatus) {
      this.tasks = [...this.tasks, { id: Date.now(), title, status }]
    },
    moveTask(id: number, newStatus: TaskStatus) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id)
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], status: newStatus }
      }
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
    updateTask(id: number, title: string, status: TaskStatus) {
      const task = this.tasks.find((task) => task.id === id)
      if (task) {
        task.title = title
        task.status = status
      }
    },
  },
})
