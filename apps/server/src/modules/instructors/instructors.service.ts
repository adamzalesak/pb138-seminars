import type { CreateInstructor } from './instructor.types'
import * as instructorsRepository from './instructors.repository'

export const getAll = () =>
  instructorsRepository.findAll()

export const getById = (id: string) =>
  instructorsRepository.findById(id)

// TODO 2b: Implement this function.
//          Pass the data to instructorsRepository.create() and return the result.
//
//          Reference: students.service.ts → create
export const create = (body: CreateInstructor) => {
  throw new Error('Not implemented')
}
