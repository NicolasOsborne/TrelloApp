import { defineStore } from 'pinia'
import type { Task, TaskStatus } from '../types/types'

export const useStore = defineStore('store', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    addTask(title: string) {
      this.tasks.push({ id: Date.now(), title, status: 'À Faire' })
    },
    moveTask(id: number, newStatus: TaskStatus) {
      const task = this.tasks.find((t: any) => t.id === id)
      if (task) {
        task.status = newStatus
      }
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
  },
})
