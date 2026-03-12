import { Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'
import { cors } from '@elysiajs/cors'
import { z } from 'zod'
import { studentsRouter } from './modules/students/students.routes'
import { coursesRouter } from './modules/courses/courses.routes'
import { instructorsRouter } from './modules/instructors/instructors.routes'

export function createApp() {
  const app = new Elysia()
    .use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }))
    .use(
      openapi({
        path: '/api-docs',
        mapJsonSchema: {
          zod: (schema: any) => z.toJSONSchema(schema, { target: 'openapi-3.0' }),
        },
        exclude: { methods: ['OPTIONS'] },
        documentation: {
          info: {
            title: 'PB138 REST API',
            version: '1.0.0',
          },
        },
        scalar: {
          spec: {
            url: '/api-docs/json',
          },
        },
      }),
    )
    .use(studentsRouter)
    .use(coursesRouter)
    .use(instructorsRouter)

  return app
}
