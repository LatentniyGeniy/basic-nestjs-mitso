import { Injectable } from '@nestjs/common';

import { StudentRepository } from './student.repository';
import { ExamRepository } from '../exam/exam.repository';
import Student from './student.entity';
import Exam from '../exam/exam.entity';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly examRepository: ExamRepository,
  ) {}

  getAll = async (): Promise<Student[]> =>
    this.studentRepository.getAllStudents();

  getById = async (id: string): Promise<Student | null> => {
    const student = await this.studentRepository.getById(id);
    if (!student) return null;
    return student;
  };

  createStudent = async (data: CreateStudentDto): Promise<Student> => {
    const student = await this.studentRepository.createStudent(data);
    return student;
  };

  updateById = async (
    id: string,
    data: UpdateStudentDto,
  ): Promise<Student | null> => {
    await this.studentRepository.updateById(id, data);
    const student = await this.studentRepository.getById(id);
    if (!student) return null;
    return student;
  };

  getExamsByStudentId = async (studentId: string): Promise<Exam[] | null> => {
    const exams = await this.examRepository.getExamsByStudentId(studentId!);
    if (!exams) return null;
    return exams;
  };

  deleteById = async (id: string): Promise<Student | null> => {
    const studentDeletable = await this.studentRepository.getById(id);

    if (!studentDeletable) return null;

    const exams = await this.examRepository.getExamsByStudentId(id);
    exams.map(async (ex) =>
      ex.teacherId
        ? this.examRepository.updateBySTID(id)
        : this.examRepository.deleteById(ex.id),
    );
    await this.studentRepository.deleteById(id);

    return studentDeletable;
  };
}
