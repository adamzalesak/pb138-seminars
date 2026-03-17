import type { Database } from '../../db'
import type { CreateStudent, Student } from './student.types'

// TODO: Import the students table from '../../db/schema'
// TODO: Import eq from 'drizzle-orm'

const findAll = async (db: Database): Promise<Student[]> => {
  // TODO: Select all students from the database
  throw new Error('Not implemented')
}

const findById = async (db: Database, id: string): Promise<Student | undefined> => {
  // TODO: Select a student by ID, return undefined if not found
  throw new Error('Not implemented')
}

const create = async (db: Database, data: CreateStudent): Promise<Student> => {
  // TODO: Insert a new student and return the created row
  throw new Error('Not implemented')
}

export const studentsRepository = { findAll, findById, create }
