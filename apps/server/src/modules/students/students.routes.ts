import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import {
  CreateStudentBodySchema,
  StudentFilterSchema,
  StudentSchema,
} from './student.schema'
import * as studentsService from './students.service'
import { ErrorResponseSchema } from '../../types'

export const studentsRouter = new OpenAPIHono()

// GET /students
studentsRouter.openapi(
  createRoute({
    method: 'get',
    path: '/',
    tags: ['Students'],
    operationId: 'getStudents',
    description: 'Returns all students. Optionally filter by enrolled course.',
    request: {
      query: StudentFilterSchema,
    },
    responses: {
      200: {
        description: 'List of students',
        content: {
          'application/json': { schema: z.array(StudentSchema) },
        },
      },
    },
  }),
  (c) => {
    const filter = c.req.valid('query')
    const students = studentsService.getAll(filter)
    return c.json(students, 200)
  },
)

// GET /students/:id
studentsRouter.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['Students'],
    operationId: 'getStudentById',
    description: 'Returns a single student by ID.',
    request: {
      params: z.object({ id: z.string() }),
    },
    responses: {
      200: {
        description: 'The student',
        content: {
          'application/json': { schema: StudentSchema },
        },
      },
      404: {
        description: 'Student not found',
        content: {
          'application/json': { schema: ErrorResponseSchema },
        },
      },
    },
  }),
  (c) => {
    const { id } = c.req.valid('param')
    const student = studentsService.getById(id)

    if (!student) {
      return c.json({ message: `Student with id '${id}' not found` }, 404)
    }

    return c.json(student, 200)
  },
)

// POST /students
studentsRouter.openapi(
  createRoute({
    method: 'post',
    path: '/',
    tags: ['Students'],
    operationId: 'createStudent',
    description: 'Creates a new student. Validates email format and UCO (must be exactly 6 digits).',
    request: {
      body: {
        content: {
          'application/json': { schema: CreateStudentBodySchema },
        },
      },
    },
    responses: {
      201: {
        description: 'Student created',
        content: {
          'application/json': { schema: StudentSchema },
        },
      },
    },
  }),
  (c) => {
    const body = c.req.valid('json')
    const student = studentsService.create(body)
    return c.json(student, 201)
  },
)
