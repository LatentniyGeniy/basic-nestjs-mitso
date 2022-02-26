import { EntityRepository, AbstractRepository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import Teacher from './teacher.entity';

@EntityRepository(Teacher)
export class TeacherRepository extends AbstractRepository<Teacher> {
  createTeacher(data: CreateTeacherDto) {
    const teachers = this.repository.create(data);
    return this.manager.save(teachers);
  }

  getAllTeachers() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  updateById(id: string, data: UpdateTeacherDto) {
    return this.repository.update({ id }, data);
  }
}
