import { sql } from 'drizzle-orm'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { afterAll, beforeAll, beforeEach } from 'vitest'

const testUrl = process.env.DATABASE_URL_TEST
if (!testUrl) {
  throw new Error(
    'DATABASE_URL_TEST is not set. Set it to a separate database — e.g. ' +
      'postgresql://postgres:postgres@localhost:5432/pb138_test',
  )
}

if (process.env.DATABASE_URL && process.env.DATABASE_URL === testUrl) {
  // belt-and-suspenders: never run tests against the dev URL
  throw new Error('DATABASE_URL must not equal DATABASE_URL_TEST')
}

// Make the db module pick up the test URL.
process.env.DATABASE_URL = testUrl

// db is imported AFTER env is overridden so the pool connects to the test DB.
const { db, pool } = await import('./db')

beforeAll(async () => {
  await migrate(db, { migrationsFolder: './drizzle' })
})

beforeEach(async () => {
  await db.execute(sql`
    TRUNCATE TABLE enrollments, courses, students, instructors RESTART IDENTITY CASCADE
  `)
})

afterAll(async () => {
  await pool.end()
})
