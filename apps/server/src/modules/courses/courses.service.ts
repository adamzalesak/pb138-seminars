import { db } from '../../db'
import type { CourseFilter, CreateCourse } from './course.types'
import { coursesRepository } from './courses.repository'

const getAll = async (filter?: CourseFilter) => {
  let result = await coursesRepository.findAll(db)

  if (filter?.semester) {
    result = result.filter((course) => course.semester === filter.semester)
  }

  if (filter?.minCredits !== undefined) {
    result = result.filter((course) => course.credits >= filter.minCredits!)
  }
  if (filter?.maxCredits !== undefined) {
    result = result.filter((course) => course.credits <= filter.maxCredits!)
  }

  if (filter?.instructorId) {
    result = result.filter((course) => course.instructorId === filter.instructorId)
  }

  return result
}

const getById = (id: string) =>
  coursesRepository.findById(db, id)

const create = (body: CreateCourse) =>
  coursesRepository.create(db, body)

export const coursesService = { getAll, getById, create }
