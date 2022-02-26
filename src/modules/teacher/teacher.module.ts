import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import {ExamRepository} from "../exam/exam.repository";

@Module({
  imports: [TypeOrmModule.forFeature([TeacherRepository, ExamRepository])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
