import { CreateInstructorBody } from './instructor.model'
import { instructorsRepository } from './instructors.repository'

// TODO: Define a Zod schema for CreateInstructorBody here.
//       Validate that firstName and lastName are non-empty strings (max 50 chars),
//       that email is a valid email address, and that department is non-empty.
//       See students.service.ts for an example.

export class InstructorsService {
  getAll() {
    return instructorsRepository.findAll()
  }

  getById(id: string) {
    return instructorsRepository.findById(id)
  }

  // TODO: Implement this method.
  //       1. Parse and validate `body` with your Zod schema.
  //       2. Pass the validated data to instructorsRepository.create().
  //       3. Return the created instructor.
  create(body: CreateInstructorBody) {
    throw new Error('Not implemented')
  }
}

export const instructorsService = new InstructorsService()
