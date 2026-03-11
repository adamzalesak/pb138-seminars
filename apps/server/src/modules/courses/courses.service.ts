import type { CourseFilter, CreateCourse } from './course.types'
import * as coursesRepository from './courses.repository'

export const getAll = (filter?: CourseFilter) => {
  let result = coursesRepository.findAll()

  // TODO 1a: If filter.semester is set, keep only courses with a matching semester.

  // TODO 1b: If filter.tags is set, keep only courses that contain ALL of the requested tags.
  //          (e.g. tags ["web", "html"] → course.tags must include both "web" AND "html")

  // TODO 1c: If filter.minCredits or filter.maxCredits is set, keep only courses
  //          whose credits fall within the range (inclusive on both ends).

  // TODO 1d: If filter.instructorId is set, keep only courses taught by that instructor.

  return result
}

export const getById = (id: string) =>
  coursesRepository.findById(id)

export const create = (body: CreateCourse) =>
  coursesRepository.create(body)
