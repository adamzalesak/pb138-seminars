import { Elysia } from 'elysia'
import { z } from 'zod'
import { CreateInstructorBodySchema, InstructorSchema } from './instructor.schema'
import { ErrorResponseSchema } from '../../types'
import * as instructorsService from './instructors.service'

export const instructorsRouter = new Elysia({ prefix: '/instructors', tags: ['Instructors'] })
  .model({
    Instructor: InstructorSchema,
    InstructorList: z.array(InstructorSchema),
    CreateInstructorBody: CreateInstructorBodySchema,
    ErrorResponse: ErrorResponseSchema,
  })

  // GET /instructors
  .get('/', () => {
    return instructorsService.getAll()
  }, {
    response: { 200: 'InstructorList' },
    detail: {
      description: 'Returns all instructors.',
    },
  })

  // GET /instructors/:id
  .get('/:id', ({ params: { id }, set }) => {
    const instructor = instructorsService.getById(id)
    if (!instructor) {
      set.status = 404
      return { message: `Instructor with id '${id}' not found` }
    }
    return instructor
  }, {
    response: { 200: 'Instructor', 404: 'ErrorResponse' },
    detail: {
      description: 'Returns a single instructor by ID.',
    },
  })

  // POST /instructors
  .post('/', ({ body }) => {
    return instructorsService.create(body)
  }, {
    body: 'CreateInstructorBody',
    response: { 200: 'Instructor' },
    detail: {
      description: 'Creates a new instructor.',
    },
  })
