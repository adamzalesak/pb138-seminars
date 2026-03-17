import { eq, count, getTableColumns } from 'drizzle-orm'
import type { Database } from '../../db'
import { courses as coursesTable, enrollments as enrollmentsTable } from '../../db/schema'
import type { Course, CreateCourse } from './course.types'

// This query is more complex than the others — it joins enrollments to count
// how many students are enrolled in each course.
// Docs: https://orm.drizzle.team/docs/joins
const findAll = async (db: Database): Promise<Course[]> => {
  const rows = await db
    .select({
      ...getTableColumns(coursesTable),
      enrolled: count(enrollmentsTable.id),
    })
    .from(coursesTable)
    .leftJoin(enrollmentsTable, eq(coursesTable.id, enrollmentsTable.courseId))
    .groupBy(coursesTable.id)
  return rows
}

const findById = async (db: Database, id: string): Promise<Course | undefined> => {
  // TODO: Same pattern as findAll, but filtered by id. Return undefined if not found.
  throw new Error('Not implemented')
}

const create = async (db: Database, data: CreateCourse): Promise<Course> => {
  // TODO: Insert a new course and return the created row.
  // Hint: A newly created course always has 0 enrollments.
  throw new Error('Not implemented')
}

export const coursesRepository = { findAll, findById, create }
