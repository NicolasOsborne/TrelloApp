export type TaskStatus = 'À Faire' | 'En Cours' | 'À Approuver' | 'Terminé'

export interface Task {
  id: number
  title: string
  status: TaskStatus
}

export interface List {
  id: number
  title: string
  tasks: Task[]
}
