import { Injectable } from '@nestjs/common';
import { TeacherRepository } from './teacher.repository';
import Teacher from './teacher.entity';
import Exam from '../exam/exam.entity';

import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

import { ExamRepository } from '../exam/exam.repository';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly examRepository: ExamRepository,
  ) {}

  getAll = async (): Promise<Teacher[]> =>
    this.teacherRepository.getAllTeachers();

  getById = async (id: string): Promise<Teacher | null> => {
    const teacher = await this.teacherRepository.getById(id);
    if (!teacher) return null;
    return teacher;
  };

  createTeacher = async (data: CreateTeacherDto,): Promise<Teacher> => {
    const teacher = await this.teacherRepository.createTeacher(data);
    return teacher;
  };

  deleteById = async (id: string): Promise<Teacher | null> => {
    const teacherDeletable = await this.teacherRepository.getById(id);

    if (!teacherDeletable) return null;

    const exams = await this.examRepository.getExamsByTeacherId(id);
    exams.map(async (ex) =>
      ex.studentId
        ? this.examRepository.updateByTEID(id)
        : this.examRepository.deleteById(ex.id),
    );
    await this.teacherRepository.deleteById(id);

    return teacherDeletable;
  };

  updateById = async (
    id: string,
    data: UpdateTeacherDto,
  ): Promise<Teacher | null> => {
    await this.teacherRepository.updateById(id, data);
    const teacher = await this.teacherRepository.getById(id);
    if (!teacher) return null;
    return teacher;
  };

  getExamsByTeacherId = async (teacherId: string): Promise<Exam[] | null> => {
    const exams = await this.examRepository.getExamsByTeacherId(teacherId!);
    if (!exams) return null;
    return exams;
  };
}
