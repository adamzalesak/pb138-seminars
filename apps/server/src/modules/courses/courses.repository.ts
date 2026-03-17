import type { Database } from '../../db'
import type { Course, CreateCourse } from './course.types'

// TODO: Import the courses table from '../../db/schema'
// TODO: Import eq from 'drizzle-orm'

const findAll = async (db: Database): Promise<Course[]> => {
  // TODO: Select all courses from the database
  throw new Error('Not implemented')
}

const findById = async (db: Database, id: string): Promise<Course | undefined> => {
  // TODO: Select a course by ID, return undefined if not found
  throw new Error('Not implemented')
}

const create = async (db: Database, data: CreateCourse): Promise<Course> => {
  // TODO: Insert a new course and return the created row
  throw new Error('Not implemented')
}

export const coursesRepository = { findAll, findById, create }
