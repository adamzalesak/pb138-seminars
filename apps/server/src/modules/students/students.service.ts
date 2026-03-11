import type { CreateStudent, StudentFilter } from './student.types'
import * as studentsRepository from './students.repository'

export const getAll = (filter?: StudentFilter) =>
  studentsRepository.findAll(filter)

export const getById = (id: string) =>
  studentsRepository.findById(id)

export const create = (body: CreateStudent) =>
  studentsRepository.create(body)
