import { randomUUID } from 'crypto'
import { CreateInstructorBody, Instructor } from './instructor.model'

const instructors: Instructor[] = [
  {
    id: '1',
    firstName: 'Jan',
    lastName: 'Novák',
    email: 'jan.novak@fi.muni.cz',
    department: 'Department of Computer Science',
    courseIds: ['1', '4'],
  },
  {
    id: '2',
    firstName: 'Petra',
    lastName: 'Dvořáková',
    email: 'petra.dvorakova@fi.muni.cz',
    department: 'Department of Computer Science',
    courseIds: ['2', '3'],
  },
  {
    id: '3',
    firstName: 'Marie',
    lastName: 'Horáková',
    email: 'marie.horakova@fi.muni.cz',
    department: 'Department of Information Systems',
    courseIds: ['5'],
  },
]

export class InstructorsRepository {
  findAll(): Instructor[] {
    return [...instructors]
  }

  findById(id: string): Instructor | undefined {
    return instructors.find((i) => i.id === id)
  }

  create(body: CreateInstructorBody): Instructor {
    const newInstructor: Instructor = { ...body, id: randomUUID(), courseIds: [] }
    instructors.push(newInstructor)
    return newInstructor
  }
}

export const instructorsRepository = new InstructorsRepository()
