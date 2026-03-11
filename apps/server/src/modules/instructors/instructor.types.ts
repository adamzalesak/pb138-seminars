export interface Instructor {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
  courseIds: string[]
}

export interface CreateInstructor {
  firstName: string
  lastName: string
  email: string
  department: string
}
