import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminRepository } from '../admin/admin.repository';
import { AdminsService } from '../admin/admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  controllers: [AuthController],
  providers: [AuthService, AdminsService],
  exports: [AuthService],
})
export class AuthModule {}
