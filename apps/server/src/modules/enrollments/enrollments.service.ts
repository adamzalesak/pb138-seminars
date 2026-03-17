import { db } from '../../db'
import { coursesRepository } from '../courses/courses.repository'
import type { BulkEnroll, TransferEnrollment } from './enrollment.types'
import { enrollmentsRepository } from './enrollments.repository'

const bulkEnroll = async (data: BulkEnroll): Promise<number> => {
  // TODO: Use db.transaction() to insert all enrollments atomically.
  // Inside the callback, call enrollmentsRepository.createEnrollment(tx, ...) for each courseId.
  // If any insert fails (e.g. duplicate or invalid FK), all are rolled back.
  // Return the number of enrollments created.
  throw new Error('Not implemented')
}

const transferEnrollment = async (data: TransferEnrollment): Promise<void> => {
  // TODO: Use db.transaction() with { isolationLevel: 'serializable' }.
  // Inside the callback, use repository methods with `tx`:
  //   1. const course = await coursesRepository.findById(tx, data.toCourseId)
  //      — throw 'Target course not found' if missing.
  //   2. const enrolled = await enrollmentsRepository.countByCourse(tx, data.toCourseId)
  //      — throw 'Target course is full' if enrolled >= course.capacity.
  //   3. const deleted = await enrollmentsRepository.deleteEnrollment(tx, data.studentId, data.fromCourseId)
  //      — throw 'Student is not enrolled in the source course' if deleted === 0.
  //   4. await enrollmentsRepository.createEnrollment(tx, data.studentId, data.toCourseId)
  throw new Error('Not implemented')
}

export const enrollmentsService = { bulkEnroll, transferEnrollment }
