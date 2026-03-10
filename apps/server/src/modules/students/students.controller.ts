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
import { CreateStudentBody, Student } from './student.model'
import { studentsService } from './students.service'
import { ErrorResponse } from '../../types'

/**
 * Students enrolled in courses.
 *
 * Example endpoints:
 *  GET  /students       — list all students, optionally filtered by enrolled course
 *  GET  /students/:id   — get a single student
 *  POST /students       — create a student (Zod validates email & UCO format)
 */
@Route('students')
@Tags('Students')
export class StudentsController extends Controller {
  /**
   * Returns all students. Optionally filter by enrolled course.
   *
   * @param courseId Filter to students enrolled in this course
   */
  @Get()
  @OperationId('getStudents')
  public async getStudents(@Query() courseId?: string): Promise<Student[]> {
    return studentsService.getAll({ courseId })
  }

  /**
   * Returns a single student by ID.
   */
  @Get('{id}')
  @OperationId('getStudentById')
  @Response<ErrorResponse>(404, 'Student not found')
  public async getStudentById(@Path() id: string): Promise<Student> {
    const student = studentsService.getById(id)

    if (!student) {
      this.setStatus(404)
      throw Object.assign(new Error(`Student with id '${id}' not found`), { status: 404 })
    }

    return student
  }

  /**
   * Creates a new student.
   * Zod validates email format and UCO (must be exactly 6 digits).
   */
  @Post()
  @OperationId('createStudent')
  @SuccessResponse(201, 'Student created')
  public async createStudent(@Body() body: CreateStudentBody): Promise<Student> {
    this.setStatus(201)
    return studentsService.create(body)
  }
}
