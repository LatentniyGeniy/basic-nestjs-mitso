import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

import Teacher from './modules/teacher/teacher.entity';
import Student from './modules/student/student.entity';
import Exam from './modules/exam/exam.entity';
import { Admin } from './modules/admin/admin.entity';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

export default {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  entities: [Teacher, Student, Exam, Admin],
  // synchronize: true,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migrations' },
} as ConnectionOptions;
