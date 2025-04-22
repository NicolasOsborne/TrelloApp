export const colors = [
  '#fa8181',
  '#ffc527',
  '#b9ff80',
  '#72f5e3',
  '#a9a2ff',
  '#ffa2fa',
  '#ff9ab0',
]

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

export const roleInfo = {
  [Role.frontend]: { initials: 'FE', color: colors[4] },
  [Role.backend]: { initials: 'BA', color: colors[6] },
  [Role.fullStack]: { initials: 'FS', color: colors[5] },
  [Role.designer]: { initials: 'UX', color: colors[0] },
  [Role.owner]: { initials: 'PO', color: colors[2] },
  [Role.scrum]: { initials: 'SM', color: colors[3] },
}

export interface ChecklistItem {
  text: string
  completed: boolean
}

export interface Task {
  id: number
  title: string
  checklist: ChecklistItem[]
  status: string
  role: Role
  date: string
}

export interface TaskList {
  id: number
  title: string
  tasks: Task[]
}

export interface Column {
  id: number
  name: string
  color: string
}
