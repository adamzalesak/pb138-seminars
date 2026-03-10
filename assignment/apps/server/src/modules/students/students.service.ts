import { z } from 'zod'
import { CreateStudentBody, StudentFilter } from './student.model'
import { studentsRepository } from './students.repository'

const CreateStudentSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  uco: z.string().regex(/^\d{6}$/, 'UCO must be exactly 6 digits'),
})

export class StudentsService {
  getAll(filter?: StudentFilter) {
    return studentsRepository.findAll(filter)
  }

  getById(id: string) {
    return studentsRepository.findById(id)
  }

  create(body: CreateStudentBody) {
    const validated = CreateStudentSchema.parse(body)
    return studentsRepository.create(validated)
  }
}

export const studentsService = new StudentsService()
