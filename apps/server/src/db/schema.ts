import { pgTable, uuid, text, integer, timestamp, unique, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ── Students ────────────────────────────────────────────────────────────────

export const students = pgTable('students', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  uco: text('uco').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ── Instructors ─────────────────────────────────────────────────────────────

export const instructors = pgTable('instructors', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  department: text('department').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ── Courses ─────────────────────────────────────────────────────────────────

// TODO: Define the courses table with these columns:
//   - id (uuid, primary key, random default)
//   - code (text, not null, unique)
//   - name (text, not null)
//   - description (text, not null)
//   - credits (integer, not null)
//   - instructorId (uuid, not null, foreign key → instructors.id)
//   - semester (not null) — use pgEnum with values: 'fall', 'spring'
//     Hint: define a pgEnum above the table, e.g. export const semesterEnum = pgEnum('semester', [...])
//     then use semesterEnum('semester') as the column type
//   - year (integer, not null)
//   - capacity (integer, not null)
//   - createdAt (timestamp, default now, not null)
export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  // TODO: Add the remaining columns
})

// ── Enrollments (M:N junction table) ────────────────────────────────────────

// TODO: Define the enrollments table with these columns:
//   - id (uuid, primary key, random default)
//   - studentId (uuid, not null, foreign key → students.id)
//   - courseId (uuid, not null, foreign key → courses.id)
//   - enrolledAt (timestamp, default now, not null)
//   - unique constraint on (studentId, courseId)
export const enrollments = pgTable('enrollments', {
  id: uuid('id').primaryKey().defaultRandom(),
  // TODO: Add the remaining columns and the unique constraint
})

// ── Relations ───────────────────────────────────────────────────────────────

// TODO: Define relations for all tables using the `relations` helper from drizzle-orm.
//   This enables the Drizzle relational query API (db.query.students.findMany({ with: { ... } })).
//   Docs: https://orm.drizzle.team/docs/relations
//
//   Define the following:
//   - studentRelations:  students have many enrollments
//   - instructorRelations: instructors have many courses
//   - courseRelations: courses have one instructor and many enrollments
//   - enrollmentRelations: enrollments have one student and one course
//
//   Example:
//     export const courseRelations = relations(courses, ({ one, many }) => ({
//       instructor: one(instructors, { fields: [courses.instructorId], references: [instructors.id] }),
//       enrollments: many(enrollments),
//     }))
