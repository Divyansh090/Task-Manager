export interface Task {
  id: string
  title: string
  description?: string
  status: 'PENDING' | 'COMPLETED'
  userId: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name?: string,
}