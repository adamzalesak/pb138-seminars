import { faker } from '@faker-js/faker'
import { db } from './index'
import { students, instructors, courses, enrollments } from './schema'

async function main() {
  console.log('Seeding database...')

  // Clear existing data (reverse FK order)
  await db.delete(enrollments)
  await db.delete(courses)
  await db.delete(students)
  await db.delete(instructors)

  // ── Instructors (done) ──────────────────────────────────────────────────

  const createdInstructors = await db
    .insert(instructors)
    .values(
      Array.from({ length: 3 }, () => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        department: faker.helpers.arrayElement([
          'Department of Computer Science',
          'Department of Information Systems',
          'Department of Mathematics',
        ]),
      })),
    )
    .returning()

  console.log(`Created ${createdInstructors.length} instructors`)

  // ── Students (done) ─────────────────────────────────────────────────────

  const createdStudents = await db
    .insert(students)
    .values(
      Array.from({ length: 10 }, () => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        uco: faker.string.numeric(6),
      })),
    )
    .returning()

  console.log(`Created ${createdStudents.length} students`)

  // ── Courses ─────────────────────────────────────────────────────────────

  // TODO: Insert 5 courses. Each course needs an instructorId from createdInstructors.

  // ── Enrollments ─────────────────────────────────────────────────────────

  // TODO: Insert enrollments — enroll each student into 1–3 random courses.

  console.log('Done!')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
