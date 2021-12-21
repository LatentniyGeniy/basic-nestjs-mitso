import { EntityRepository, AbstractRepository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import Student from './student.entity';

@EntityRepository(Student)
export class StudentRepository extends AbstractRepository<Student> {
  createStudent(data: CreateStudentDto) {
    const students = this.repository.create(data);
    return this.manager.save(students);
  }

  getAllStudents() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({id});
  }

  deleteById(id: string) {
    return this.repository.delete({id});
  }

  updateById(id: string, data: UpdateStudentDto) {
    return this.repository.update({id}, data)
  }
}