import { eq, count, gte, lte, and, getTableColumns } from 'drizzle-orm'
import type { Database } from '../../db'
import { courses as coursesTable, enrollments as enrollmentsTable } from '../../db/schema'
import type { Course, CourseFilter, CreateCourse } from './course.types'

// This query is more complex than the others — it joins enrollments to count
// how many students are enrolled in each course, and filters using Drizzle's where().
// Docs: https://orm.drizzle.team/docs/joins, https://orm.drizzle.team/docs/operators
const findAll = async (db: Database, filter?: CourseFilter): Promise<Course[]> => {
  // TODO: Build an array of Drizzle conditions from the filter object:
  //   - filter.semester     → eq(coursesTable.semester, ...)
  //   - filter.minCredits   → gte(coursesTable.credits, ...)
  //   - filter.maxCredits   → lte(coursesTable.credits, ...)
  //   - filter.instructorId → eq(coursesTable.instructorId, ...)
  // Then pass them to .where(and(...conditions)) — or undefined if no filters.

  const rows = await db
    .select({
      ...getTableColumns(coursesTable),
      enrolled: count(enrollmentsTable.id),
    })
    .from(coursesTable)
    .leftJoin(enrollmentsTable, eq(coursesTable.id, enrollmentsTable.courseId))
    // .where(...)  ← add your conditions here
    .groupBy(coursesTable.id)
  return rows
}

const findById = async (db: Database, id: string): Promise<Course | undefined> => {
  // TODO: Same join pattern as findAll, but filtered by id. Return undefined if not found.
  throw new Error('Not implemented')
}

const create = async (db: Database, data: CreateCourse): Promise<Course> => {
  // TODO: Insert a new course and return the created row.
  // Hint: A newly created course always has 0 enrollments.
  throw new Error('Not implemented')
}

export const coursesRepository = { findAll, findById, create }
