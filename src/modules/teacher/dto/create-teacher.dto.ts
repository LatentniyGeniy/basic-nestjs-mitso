import { IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsString()
  degree: string;
}
