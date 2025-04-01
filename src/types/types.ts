export enum TaskStatus {
  toDo = 'À Faire',
  inProgress = 'En Cours',
  toApprove = 'À Approuver',
  done = 'Terminé',
}

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
