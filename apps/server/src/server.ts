import { createApp } from './app'

const port = Number(process.env.PORT ?? 3000)

const app = createApp()

console.log(`Server running on http://localhost:${port}`)
console.log(`API docs:   http://localhost:${port}/api-docs`)
console.log(`OpenAPI:    http://localhost:${port}/openapi.json`)

export default {
  port,
  fetch: app.fetch,
}
