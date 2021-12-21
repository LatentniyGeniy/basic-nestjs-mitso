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
import { HttpExceptionFilter } from '../../common';

import { ExamService } from './exam.service';
import Teacher from '../teacher/teacher.entity';
import Exam from "./exam.entity";
import { AuthGuard } from '../auth/auth.guard';

@Controller('exams/')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class ExamController {
  constructor(private readonly examsService: ExamService) {}

  @Get('/')
  async getAll(@Req() req: Request, @Res() res: Response) {
    const exams = await this.examsService.getAll();

    return res.status(StatusCodes.OK).json(exams.map(Exam.toResponse));
  }

  @Post('/')
  async createExam(@Req() req: Request, @Res() res: Response) {
    const exam = await this.examsService.createExam(req.body);

    if (exam) {
      res.status(StatusCodes.CREATED).json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const exam = await this.examsService.getById(id!);

    if (exam) {
      res.json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_FOUND', msg: 'exam not found' });
    }
  }

  @Put('/:id')
  async updateExam(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const exam = await this.examsService.updateById(id!, req.body);

    if (exam) {
      res.status(StatusCodes.OK).json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_FOUND', msg: 'exam not found' });
    }
  }

  @Delete('/:id')
  async deleteById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const exam = await this.examsService.deleteById(id!);

    if (exam) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'EXAM_DELETED', msg: 'The exam has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_FOUND', msg: 'exam not found' });
    }
  }

  @Get('/:examId/teachers')
  async getTeachersByExamId(@Req() req: Request, @Res() res: Response) {
    const { examId } = req.params;

    const teachers = await this.examsService.getTeachersByExamId(examId!);

    if (teachers) {
      res.json(Teacher.toResponse(teachers));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_CREATE', msg: 'Exam not found' });
    }
  }
}
