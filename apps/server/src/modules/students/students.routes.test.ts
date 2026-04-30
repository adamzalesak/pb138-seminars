import { expect, test } from 'vitest'
import { createApp } from '../../app'
import { db } from '../../db'
import { students } from '../../db/schema'

const app = createApp()

test('GET /students returns the seeded list', async () => {
  await db.insert(students).values([
    { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@muni.cz', uco: '100001' },
    { firstName: 'Alan', lastName: 'Turing', email: 'alan@muni.cz', uco: '100002' },
  ])

  const response = await app.handle(new Request('http://localhost/students'))
  expect(response.status).toBe(200)

  const body = (await response.json()) as Array<{ email: string; uco: string }>
  expect(body).toHaveLength(2)
  expect(body.map((s) => s.uco).sort()).toEqual(['100001', '100002'])
})

test('POST /students rejects an invalid uco with 400', async () => {
  const response = await app.handle(
    new Request('http://localhost/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Grace',
        lastName: 'Hopper',
        email: 'grace@muni.cz',
        uco: 'abc', // not 6 digits — schema regex rejects
      }),
    }),
  )

  expect(response.status).toBe(400) // Elysia maps zod validation errors to 400
})
