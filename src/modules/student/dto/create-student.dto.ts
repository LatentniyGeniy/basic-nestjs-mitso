import { IsInt, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsInt()
  numCertificate: number;
}
