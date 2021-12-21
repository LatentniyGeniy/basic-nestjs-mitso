import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateExamDto {
  @IsOptional()
  @IsUUID(4)
  teacherId: string | null;

  @IsOptional()
  @IsUUID(4)
  studentId: string | null;

  @IsString()
  date: string;

  @IsInt()
  score: number;
}
