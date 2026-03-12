import type { CreateStudent, StudentFilter } from './student.types'
import { studentsRepository } from './students.repository'

const getAll = (filter?: StudentFilter) =>
  studentsRepository.findAll(filter)

const getById = (id: string) =>
  studentsRepository.findById(id)

const create = (body: CreateStudent) =>
  studentsRepository.create(body)

export const studentsService = { getAll, getById, create }
