import type { Database } from '../../db'

// TODO: Import the enrollments & courses tables from '../../db/schema'
// TODO: Import eq, and, count from 'drizzle-orm'

/** Insert a single enrollment. */
const createEnrollment = async (db: Database, studentId: string, courseId: string) => {
  // TODO: Insert into enrollments table and return the created row.
  throw new Error('Not implemented')
}

/** Delete a student's enrollment in a specific course. Returns the number of deleted rows. */
const deleteEnrollment = async (db: Database, studentId: string, courseId: string): Promise<number> => {
  // TODO: Delete from enrollments where studentId and courseId match.
  // Return the number of deleted rows (result.rowCount or result.length).
  throw new Error('Not implemented')
}

/** Count how many students are enrolled in a given course. */
const countByCourse = async (db: Database, courseId: string): Promise<number> => {
  // TODO: SELECT count(*) FROM enrollments WHERE courseId = ...
  throw new Error('Not implemented')
}

export const enrollmentsRepository = { createEnrollment, deleteEnrollment, countByCourse }
