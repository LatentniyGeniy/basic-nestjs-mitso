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

import { TeacherService } from './teacher.service';
import Teacher from './teacher.entity';
import Exam from '../exam/exam.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('teachers/')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class TeacherController {
  constructor(private readonly teachersService: TeacherService) {}

  @Get('/')
  async getAll(@Req() req: Request, @Res() res: Response) {
    const teachers = await this.teachersService.getAll();

    return res.status(StatusCodes.OK).json(teachers.map(Teacher.toResponse));
  }

  @Post('/')
  async createTeacher(@Req() req: Request, @Res() res: Response) {
    const teacher = await this.teachersService.createTeacher(req.body);

    if (teacher) {
      res.status(StatusCodes.CREATED).json(Teacher.toResponse(teacher));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const teacher = await this.teachersService.getById(id!);

    if (teacher) {
      res.json(Teacher.toResponse(teacher));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_FOUND', msg: 'Teacher not found' });
    }
  }

  @Put('/:id')
  async updateTeacher(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const teacher = await this.teachersService.updateById(id!, req.body);

    if (teacher) {
      res.status(StatusCodes.OK).json(Teacher.toResponse(teacher));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_FOUND', msg: 'Teacher not found' });
    }
  }

  @Delete('/:id')
  async deleteById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const teacher = await this.teachersService.deleteById(id!);

    if (teacher) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'STUDENT_DELETED', msg: 'The teacher has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'STUDENT_NOT_FOUND', msg: 'Teacher not found' });
    }
  }

  @Get('/:teacherId/exams')
  async getExamsByTeacherId(@Req() req: Request, @Res() res: Response) {
    const { teacherId } = req.params;

    const exam = await this.teachersService.getExamsByTeacherId(teacherId!);

    if (exam) {
      res.json(exam.map(Exam.toResponse));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_CREATE', msg: 'Teacher not found' });
    }
  }
}
