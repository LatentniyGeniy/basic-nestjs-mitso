import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { ExamRepository } from './exam.repository';
import {TeacherRepository} from "../teacher/teacher.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ExamRepository, TeacherRepository])],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
