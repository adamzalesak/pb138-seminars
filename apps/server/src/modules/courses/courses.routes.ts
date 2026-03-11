import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import {
  CourseQuerySchema,
  CourseSchema,
  CreateCourseBodySchema,
} from './course.schema'
import * as coursesService from './courses.service'
import { ErrorResponseSchema } from '../../types'

export const coursesRouter = new OpenAPIHono()

// GET /courses
coursesRouter.openapi(
  createRoute({
    method: 'get',
    path: '/',
    tags: ['Courses'],
    operationId: 'getCourses',
    description: 'Returns all courses. Supports optional filtering via query parameters.',
    request: {
      query: CourseQuerySchema,
    },
    responses: {
      200: {
        description: 'List of courses',
        content: {
          'application/json': { schema: z.array(CourseSchema) },
        },
      },
    },
  }),
  (c) => {
    const query = c.req.valid('query')
    const courses = coursesService.getAll({
      semester: query.semester,
      tags: query.tags ? query.tags.split(',') : undefined,
      minCredits: query.minCredits,
      maxCredits: query.maxCredits,
      instructorId: query.instructorId,
    })
    return c.json(courses, 200)
  },
)

// GET /courses/:id
coursesRouter.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['Courses'],
    operationId: 'getCourseById',
    description: 'Returns a single course by its ID.',
    request: {
      params: z.object({ id: z.string() }),
    },
    responses: {
      200: {
        description: 'The course',
        content: {
          'application/json': { schema: CourseSchema },
        },
      },
      404: {
        description: 'Course not found',
        content: {
          'application/json': { schema: ErrorResponseSchema },
        },
      },
    },
  }),
  (c) => {
    const { id } = c.req.valid('param')
    const course = coursesService.getById(id)

    if (!course) {
      return c.json({ message: `Course with id '${id}' not found` }, 404)
    }

    return c.json(course, 200)
  },
)

// POST /courses
coursesRouter.openapi(
  createRoute({
    method: 'post',
    path: '/',
    tags: ['Courses'],
    operationId: 'createCourse',
    description: 'Creates a new course. The request body is validated by Zod.',
    request: {
      body: {
        content: {
          'application/json': { schema: CreateCourseBodySchema },
        },
      },
    },
    responses: {
      201: {
        description: 'Course created',
        content: {
          'application/json': { schema: CourseSchema },
        },
      },
    },
  }),
  (c) => {
    const body = c.req.valid('json')
    const course = coursesService.create(body)
    return c.json(course, 201)
  },
)
