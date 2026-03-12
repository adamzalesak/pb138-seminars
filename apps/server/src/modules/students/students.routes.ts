import { Elysia } from 'elysia'
import { z } from 'zod'
import { CreateStudentBodySchema, StudentFilterSchema, StudentSchema } from './student.schema'
import { ErrorResponseSchema } from '../../types'
import { studentsService } from './students.service'

export const studentsRouter = new Elysia({ prefix: '/students', tags: ['Students'] })
  .model({
    Student: StudentSchema,
    StudentList: z.array(StudentSchema),
    CreateStudentBody: CreateStudentBodySchema,
    ErrorResponse: ErrorResponseSchema,
  })

  // GET /students
  .get('/', ({ query }) => {
    return studentsService.getAll(query)
  }, {
    query: StudentFilterSchema,
    response: { 200: 'StudentList' },
    detail: {
      description: 'Returns all students. Optionally filter by enrolled course.',
    },
  })

  // GET /students/:id
  .get('/:id', ({ params: { id }, set }) => {
    const student = studentsService.getById(id)
    if (!student) {
      set.status = 404
      return { message: `Student with id '${id}' not found` }
    }
    return student
  }, {
    response: { 200: 'Student', 404: 'ErrorResponse' },
    detail: {
      description: 'Returns a single student by ID.',
    },
  })

  // POST /students
  .post('/', ({ body }) => {
    return studentsService.create(body)
  }, {
    body: 'CreateStudentBody',
    response: { 200: 'Student' },
    detail: {
      description: 'Creates a new student. Validates email format and UCO (must be exactly 6 digits).',
    },
  })
