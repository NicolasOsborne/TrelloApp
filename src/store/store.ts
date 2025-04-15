import { defineStore } from 'pinia'
import { TaskStatus, type Task } from '../types/types'

export const taskStore = defineStore('store', {
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
    addTask(title: string, status: TaskStatus) {
      const newTask = { id: Date.now(), title, status }
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
    updateTask(id: number, title: string, status: TaskStatus) {
      const task = this.tasks.find((task) => task.id === id)
      if (task) {
        task.title = title
        task.status = status
      }
    },
  },
})
