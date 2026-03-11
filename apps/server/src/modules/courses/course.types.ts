export interface Course {
  id: string
  code: string
  name: string
  description: string
  credits: number
  instructorId: string
  semester: 'fall' | 'spring'
  year: number
  tags: string[]
  capacity: number
  enrolled: number
}

export interface CreateCourse {
  code: string
  name: string
  description: string
  credits: number
  instructorId: string
  semester: 'fall' | 'spring'
  year: number
  tags: string[]
  capacity: number
}

export interface CourseFilter {
  semester?: 'fall' | 'spring'
  tags?: string[]
  minCredits?: number
  maxCredits?: number
  instructorId?: string
}
