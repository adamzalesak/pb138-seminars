import {
  Body,
  Controller,
  Get,
  OperationId,
  Path,
  Post,
  Query,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa'
import { Course, CreateCourseBody } from './course.model'
import { coursesService } from './courses.service'
import { ErrorResponse } from '../../types'

/**
 * Courses are the main entity in this demo.
 *
 * Example endpoints:
 *  GET  /courses        — list all, with optional filtering (student exercise)
 *  GET  /courses/:id    — get a single course
 *  POST /courses        — create a course (with Zod validation in the service)
 */
@Route('courses')
@Tags('Courses')
export class CoursesController extends Controller {
  /**
   * Returns all courses. Supports optional filtering via query parameters.
   *
   * @param semester  Filter by semester ('fall' or 'spring')
   * @param tags      Comma-separated list of tags — course must have ALL of them
   * @param minCredits Minimum number of credits (inclusive)
   * @param maxCredits Maximum number of credits (inclusive)
   * @param instructorId Filter by instructor ID
   */
  @Get()
  @OperationId('getCourses')
  public async getCourses(
    @Query() semester?: 'fall' | 'spring',
    @Query() tags?: string,
    @Query() minCredits?: number,
    @Query() maxCredits?: number,
    @Query() instructorId?: string,
  ): Promise<Course[]> {
    return coursesService.getAll({
      semester,
      tags: tags ? tags.split(',') : undefined,
      minCredits,
      maxCredits,
      instructorId,
    })
  }

  /**
   * Returns a single course by its ID.
   */
  @Get('{id}')
  @OperationId('getCourseById')
  @Response<ErrorResponse>(404, 'Course not found')
  public async getCourseById(@Path() id: string): Promise<Course> {
    const course = coursesService.getById(id)

    if (!course) {
      this.setStatus(404)
      throw Object.assign(new Error(`Course with id '${id}' not found`), { status: 404 })
    }

    return course
  }

  /**
   * Creates a new course.
   * The request body is validated by Zod in CoursesService before hitting the repository.
   */
  @Post()
  @OperationId('createCourse')
  @SuccessResponse(201, 'Course created')
  public async createCourse(@Body() body: CreateCourseBody): Promise<Course> {
    this.setStatus(201)
    return coursesService.create(body)
  }
}
