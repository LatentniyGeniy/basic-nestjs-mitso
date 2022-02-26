import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpExceptionFilter } from "../../common";

import { StudentService } from './student.service';
import Student from './student.entity';
import Exam from '../exam/exam.entity';

import { AuthGuard } from '../auth/auth.guard';

@Controller('students/')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class StudentController {
  constructor(private readonly studentsService: StudentService) {}

  @Get('/')
  async getAll(@Req() req: Request, @Res() res: Response) {
    const teachers = await this.studentsService.getAll();

    return res.status(StatusCodes.OK).json(teachers.map(Student.toResponse));
  }

  @Post('/')
  async createStudent(@Req() req: Request, @Res() res: Response) {
    const student = await this.studentsService.createStudent(req.body);

    if (student) {
      res.status(StatusCodes.CREATED).json(Student.toResponse(student));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const student = await this.studentsService.getById(id!);

    if (student) {
      res.json(Student.toResponse(student));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'STUDENT_NOT_FOUND', msg: 'student not found' });
    }
  }

  @Put('/:id')
  async updateStudent(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const student = await this.studentsService.updateById(id!, req.body);

    if (student) {
      res.status(StatusCodes.OK).json(Student.toResponse(student));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'STUDENT_NOT_FOUND', msg: 'student not found' });
    }
  }

  @Delete('/:id')
  async deleteById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const student = await this.studentsService.deleteById(id!);

    if (student) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'STUDENT_DELETED', msg: 'The teacher has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'STUDENT_NOT_FOUND', msg: 'student not found' });
    }
  }

  @Get('/:studentId/exams')
  async getExamsByTeacherId(@Req() req: Request, @Res() res: Response) {
    const { studentId } = req.params;

    const exam = await this.studentsService.getExamsByStudentId(studentId!);

    if (exam) {
      res.json(exam.map(Exam.toResponse));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'STUDENT_NOT_CREATE', msg: 'Teacher not found' });
    }
  }
}
