import { z } from 'zod'

export const InstructorSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  department: z.string(),
  courseIds: z.array(z.string()),
})

// TODO 2a: Add validation constraints to this schema.
//          Currently it accepts any strings — add proper constraints:
//          - firstName: non-empty, max 50 characters
//          - lastName: non-empty, max 50 characters
//          - email: valid email format
//          - department: non-empty
//
//          Reference: CreateStudentBodySchema in student.schema.ts
export const CreateInstructorBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  department: z.string(),
})
