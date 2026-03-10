import { z } from 'zod'
import { CourseFilter, CreateCourseBody } from './course.model'
import { coursesRepository } from './courses.repository'

// Zod schema mirrors CreateCourseBody but adds runtime constraints
// that TypeScript types alone cannot enforce.
const CreateCourseSchema = z.object({
  code: z.string().min(2).max(10),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  credits: z.number().int().min(1).max(10),
  instructorId: z.string().min(1),
  semester: z.enum(['fall', 'spring']),
  year: z.number().int().min(2000).max(2100),
  tags: z.array(z.string().min(1)).min(1),
  capacity: z.number().int().min(1).max(500),
})

export class CoursesService {
  getAll(filter?: CourseFilter) {
    let result = coursesRepository.findAll()

    // TODO: filter by semester
    // TODO: filter by tags — course must have ALL requested tags
    // TODO: filter by minCredits / maxCredits
    // TODO: filter by instructorId

    return result
  }

  getById(id: string) {
    return coursesRepository.findById(id)
  }

  // Zod validates the incoming body at runtime before touching the repository.
  // If validation fails, Zod throws a ZodError with a structured error message.
  create(body: CreateCourseBody) {
    const validated = CreateCourseSchema.parse(body)
    return coursesRepository.create(validated)
  }
}

export const coursesService = new CoursesService()
