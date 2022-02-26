import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentRepository } from './student.repository';
import {ExamRepository} from "../exam/exam.repository";

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository, ExamRepository])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
