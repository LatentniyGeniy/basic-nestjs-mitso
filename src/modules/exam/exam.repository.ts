import { EntityRepository, AbstractRepository } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

import Exam from './exam.entity';

@EntityRepository(Exam)
export class ExamRepository extends AbstractRepository<Exam> {
  createExam(exam: CreateExamDto) {
    const exams = this.repository.create(exam);
    return this.manager.save(exams);
  }

  getAllExams() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  updateById(id: string, exam: UpdateExamDto) {
    return this.repository.update({ id }, exam);
  }

  updateBySTID(sId: string) {
    return this.repository.update({ studentId: sId }, { studentId: null });
  }

  updateByTEID(tId: string) {
    return this.repository.update({ teacherId: tId }, { teacherId: null });
  }

  getExamsByTeacherId(tId: string) {
    return this.repository.find({ teacherId: tId });
  }

  getExamsByStudentId(sId: string) {
    return this.repository.find({ studentId: sId });
  }
}
