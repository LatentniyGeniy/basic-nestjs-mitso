import { Injectable } from '@nestjs/common';

import { ExamRepository } from './exam.repository';
import { TeacherRepository } from '../teacher/teacher.repository';
import Exam from './exam.entity';
import Teacher from '../teacher/teacher.entity';

import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly examRepository: ExamRepository,
  ) {}

  getAll = async (): Promise<Exam[]> => this.examRepository.getAllExams();

  getById = async (id: string): Promise<Exam | null> => {
    const exam = await this.examRepository.getById(id);
    if (!exam) return null;
    return exam;
  };

  createExam = async (data: CreateExamDto): Promise<Exam> => {
    const exam = await this.examRepository.createExam(data);
    return exam;
  };

  deleteById = async (id: string): Promise<Exam | null> => {
    const examDeletable = await this.examRepository.getById(id);
    if (!examDeletable) return null;
    await this.examRepository.deleteById(id);

    return examDeletable;
  };

  updateById = async (
    id: string,
    data: UpdateExamDto,
  ): Promise<Exam | null> => {
    await this.examRepository.updateById(id, data);
    const exam = await this.examRepository.getById(id);
    if (!exam) return null;
    return exam;
  };

  getTeachersByExamId = async (examId: string): Promise<Teacher | null> => {
    const exam = await this.examRepository.getById(examId);
    const teacher = await this.teacherRepository.getById(exam!.teacherId!);

    if (!teacher) return null;

    return teacher;
  };
}
