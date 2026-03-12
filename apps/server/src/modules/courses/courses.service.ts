import type { CourseFilter, CreateCourse } from './course.types'
import { coursesRepository } from './courses.repository'

const getAll = (filter?: CourseFilter) => {
  let result = coursesRepository.findAll()

  if (filter?.semester) {
    result = result.filter((course) => course.semester === filter.semester)
  }

  if (filter?.tags) {
    result = result.filter((course) =>
      filter.tags!.every((tag) => course.tags.includes(tag))
    )
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
  coursesRepository.findById(id)

const create = (body: CreateCourse) =>
  coursesRepository.create(body)

export const coursesService = { getAll, getById, create }
