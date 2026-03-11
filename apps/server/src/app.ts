import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { cors } from 'hono/cors'
import { studentsRouter } from './modules/students/students.routes'
import { coursesRouter } from './modules/courses/courses.routes'
import { instructorsRouter } from './modules/instructors/instructors.routes'

export function createApp() {
  const app = new OpenAPIHono()

  app.use('*', cors())

  // Mount module routes
  app.route('/students', studentsRouter)
  app.route('/courses', coursesRouter)
  app.route('/instructors', instructorsRouter)

  // Serve the OpenAPI spec + Swagger UI
  app.doc('/openapi.json', {
    openapi: '3.1.0',
    info: {
      title: 'PB138 REST API',
      version: '1.0.0',
    },
  })
  const swaggerHandler = swaggerUI({ url: '/openapi.json' })
  app.get('/api-docs', swaggerHandler)
  app.get('/api-docs/', swaggerHandler)

  // Global error handler
  app.onError((err, c) => {
    const status = (err as { status?: number }).status ?? 500
    const message = err instanceof Error ? err.message : 'Unexpected error'
    return c.json({ message }, status as any)
  })

  return app
}
