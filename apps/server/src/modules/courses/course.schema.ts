import { z } from '@hono/zod-openapi'

export const CourseSchema = z
  .object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    description: z.string(),
    credits: z.number().int(),
    instructorId: z.string(),
    semester: z.enum(['fall', 'spring']),
    year: z.number().int(),
    tags: z.array(z.string()),
    capacity: z.number().int(),
    enrolled: z.number().int(),
  })
  .openapi('Course')

export const CreateCourseBodySchema = z
  .object({
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
  .openapi('CreateCourseBody')

// Query parameters — tags is a comma-separated string, split in the route handler
export const CourseQuerySchema = z.object({
  semester: z.enum(['fall', 'spring']).optional(),
  tags: z.string().optional(),
  minCredits: z.coerce.number().int().optional(),
  maxCredits: z.coerce.number().int().optional(),
  instructorId: z.string().optional(),
})
