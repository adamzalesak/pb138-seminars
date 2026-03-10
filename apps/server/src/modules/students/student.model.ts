export interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  uco: string
  enrolledCourseIds: string[]
}

export interface CreateStudentBody {
  firstName: string
  lastName: string
  email: string
  uco: string
}

export interface StudentFilter {
  courseId?: string
}
