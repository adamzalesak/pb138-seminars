import { createApp } from '../src/app'

const app = createApp()

const doc = app.getOpenAPIDocument({
  openapi: '3.1.0',
  info: {
    title: 'PB138 REST API',
    version: '1.0.0',
  },
})

await Bun.write(
  new URL('../openapi.json', import.meta.url).pathname,
  JSON.stringify(doc, null, 2) + '\n',
)

console.log('OpenAPI spec written to openapi.json')
