import { randomUUID } from 'crypto'
import type { CreateStudent, Student, StudentFilter } from './student.types'

const students: Student[] = [
  {
    id: '1',
    firstName: 'Adam',
    lastName: 'Král',
    email: 'adam.kral@mail.muni.cz',
    uco: '485632',
    enrolledCourseIds: ['1', '2'],
  },
  {
    id: '2',
    firstName: 'Barbora',
    lastName: 'Máchovová',
    email: 'barbora.machovova@mail.muni.cz',
    uco: '459871',
    enrolledCourseIds: ['1', '3', '4'],
  },
  {
    id: '3',
    firstName: 'Cyril',
    lastName: 'Polák',
    email: 'cyril.polak@mail.muni.cz',
    uco: '496312',
    enrolledCourseIds: ['2', '5'],
  },
  {
    id: '4',
    firstName: 'Dana',
    lastName: 'Horáčková',
    email: 'dana.horackova@mail.muni.cz',
    uco: '501234',
    enrolledCourseIds: ['4', '5'],
  },
  {
    id: '5',
    firstName: 'Emil',
    lastName: 'Procházka',
    email: 'emil.prochazka@mail.muni.cz',
    uco: '512345',
    enrolledCourseIds: ['1', '4'],
  },
  {
    id: '6',
    firstName: 'Františka',
    lastName: 'Nováková',
    email: 'frantiska.novakova@mail.muni.cz',
    uco: '523456',
    enrolledCourseIds: ['2', '3', '5'],
  },
  {
    id: '7',
    firstName: 'Gustav',
    lastName: 'Beneš',
    email: 'gustav.benes@mail.muni.cz',
    uco: '534567',
    enrolledCourseIds: ['1', '2', '3'],
  },
  {
    id: '8',
    firstName: 'Helena',
    lastName: 'Marková',
    email: 'helena.markova@mail.muni.cz',
    uco: '545678',
    enrolledCourseIds: ['4'],
  },
  {
    id: '9',
    firstName: 'Ivan',
    lastName: 'Blažek',
    email: 'ivan.blazek@mail.muni.cz',
    uco: '556789',
    enrolledCourseIds: ['3', '5'],
  },
  {
    id: '10',
    firstName: 'Jana',
    lastName: 'Kopecká',
    email: 'jana.kopecka@mail.muni.cz',
    uco: '567890',
    enrolledCourseIds: ['1', '2', '4'],
  },
  {
    id: '11',
    firstName: 'Karel',
    lastName: 'Dvořák',
    email: 'karel.dvorak@mail.muni.cz',
    uco: '578901',
    enrolledCourseIds: ['2', '5'],
  },
  {
    id: '12',
    firstName: 'Lucie',
    lastName: 'Krejčí',
    email: 'lucie.krejci@mail.muni.cz',
    uco: '589012',
    enrolledCourseIds: ['1', '3', '4', '5'],
  },
]

const findAll = (filter?: StudentFilter): Student[] => {
  let result = [...students]

  if (filter?.courseId) {
    result = result.filter((s) => s.enrolledCourseIds.includes(filter.courseId!))
  }

  return result
}

const findById = (id: string): Student | undefined =>
  students.find((s) => s.id === id)

const create = (body: CreateStudent): Student => {
  const newStudent: Student = { ...body, id: randomUUID(), enrolledCourseIds: [] }
  students.push(newStudent)
  return newStudent
}

export const studentsRepository = { findAll, findById, create }
