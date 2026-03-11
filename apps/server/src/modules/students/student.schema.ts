import { z } from '@hono/zod-openapi'

export const StudentSchema = z
  .object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    uco: z.string(),
    enrolledCourseIds: z.array(z.string()),
  })
  .openapi('Student')

export const CreateStudentBodySchema = z
  .object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.string().email(),
    uco: z.string().regex(/^\d{6}$/, 'UCO must be exactly 6 digits'),
  })
  .openapi('CreateStudentBody')

export const StudentFilterSchema = z.object({
  courseId: z.string().optional(),
})
