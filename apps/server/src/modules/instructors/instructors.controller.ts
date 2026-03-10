import {
  Body,
  Controller,
  Get,
  OperationId,
  Path,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa'
import { CreateInstructorBody, Instructor } from './instructor.model'
import { instructorsService } from './instructors.service'
import { ErrorResponse } from '../../types'

/**
 * Instructors who teach courses.
 */
@Route('instructors')
@Tags('Instructors')
export class InstructorsController extends Controller {
  /**
   * Returns all instructors.
   */
  @Get()
  @OperationId('getInstructors')
  public async getInstructors(): Promise<Instructor[]> {
    return instructorsService.getAll()
  }

  /**
   * Returns a single instructor by ID.
   */
  @Get('{id}')
  @OperationId('getInstructorById')
  @Response<ErrorResponse>(404, 'Instructor not found')
  public async getInstructorById(@Path() id: string): Promise<Instructor> {
    const instructor = instructorsService.getById(id)

    if (!instructor) {
      this.setStatus(404)
      throw Object.assign(new Error(`Instructor with id '${id}' not found`), { status: 404 })
    }

    return instructor
  }

  /**
   * Creates a new instructor.
   *
   * TODO: This endpoint is not yet fully implemented.
   *       The service method needs a Zod validation schema before this will work.
   *       See StudentsController.createStudent and StudentsService for a complete example.
   */
  @Post()
  @OperationId('createInstructor')
  @SuccessResponse(201, 'Instructor created')
  public async createInstructor(@Body() body: CreateInstructorBody): Promise<Instructor> {
    this.setStatus(201)
    return instructorsService.create(body)
  }
}
