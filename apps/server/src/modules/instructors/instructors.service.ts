import type { CreateInstructor } from './instructor.types'
import { instructorsRepository } from './instructors.repository'

const getAll = () =>
  instructorsRepository.findAll()

const getById = (id: string) =>
  instructorsRepository.findById(id)

const create = (body: CreateInstructor) =>
  instructorsRepository.create(body)

export const instructorsService = { getAll, getById, create }
