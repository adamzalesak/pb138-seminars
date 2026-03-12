import type { CreateInstructor } from './instructor.types'
import { instructorsRepository } from './instructors.repository'

const getAll = () =>
  instructorsRepository.findAll()

const getById = (id: string) =>
  instructorsRepository.findById(id)

// TODO 2b: Implement this function.
//          Pass the data to instructorsRepository.create() and return the result.
//
//          Reference: students.service.ts → create
const create = (body: CreateInstructor) => {
  throw new Error('Not implemented')
}

export const instructorsService = { getAll, getById, create }
