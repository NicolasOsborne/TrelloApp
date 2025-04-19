export enum TaskStatus {
  toDo = 'À Faire',
  inProgress = 'En Cours',
  toApprove = 'À Approuver',
  done = 'Terminé',
}

export enum Role {
  frontend = 'Front-End',
  backend = 'Back-End',
  fullStack = 'Full-Stack',
  designer = 'UX/UI',
  owner = 'Product Owner',
  scrum = 'Scrum Master',
}

export interface Task {
  id: number
  title: string
  description: string
  role: Role
  status: TaskStatus
}

export interface TaskList {
  id: number
  title: string
  tasks: Task[]
}

export interface Column {
  id: number
  name: string
}
