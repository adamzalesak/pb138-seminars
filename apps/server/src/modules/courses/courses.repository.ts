import { randomUUID } from 'crypto'
import type { Course, CreateCourse } from './course.types'

const courses: Course[] = [
  {
    id: '1',
    code: 'PB138',
    name: 'Modern Markup Languages',
    description: 'Introduction to XML, HTML5, CSS3, and modern web technologies.',
    credits: 4,
    instructorId: '1',
    semester: 'spring',
    year: 2025,
    tags: ['web', 'html', 'xml', 'css'],
    capacity: 50,
    enrolled: 42,
  },
  {
    id: '2',
    code: 'PB162',
    name: 'Java Programming',
    description: 'Object-oriented programming in Java. Covers classes, inheritance, and the standard library.',
    credits: 4,
    instructorId: '2',
    semester: 'fall',
    year: 2025,
    tags: ['java', 'oop', 'programming'],
    capacity: 60,
    enrolled: 55,
  },
  {
    id: '3',
    code: 'PV168',
    name: 'Seminar on Java',
    description: 'Practical seminar focused on Java application development in teams.',
    credits: 3,
    instructorId: '2',
    semester: 'spring',
    year: 2025,
    tags: ['java', 'programming', 'teamwork'],
    capacity: 30,
    enrolled: 28,
  },
  {
    id: '4',
    code: 'IA174',
    name: 'Advanced Web Technologies',
    description: 'Modern frontend and backend web development with TypeScript and Node.js.',
    credits: 4,
    instructorId: '1',
    semester: 'fall',
    year: 2025,
    tags: ['web', 'typescript', 'nodejs'],
    capacity: 40,
    enrolled: 35,
  },
  {
    id: '5',
    code: 'PA152',
    name: 'Database Systems',
    description: 'Relational databases, SQL, transactions, and query optimization.',
    credits: 4,
    instructorId: '3',
    semester: 'fall',
    year: 2025,
    tags: ['databases', 'sql'],
    capacity: 70,
    enrolled: 65,
  },
]

export const findAll = (): Course[] => [...courses]

export const findById = (id: string): Course | undefined =>
  courses.find((c) => c.id === id)

export const create = (body: CreateCourse): Course => {
  const newCourse: Course = { ...body, id: randomUUID(), enrolled: 0 }
  courses.push(newCourse)
  return newCourse
}
