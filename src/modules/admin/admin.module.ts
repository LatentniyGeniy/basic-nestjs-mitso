import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsService } from './admin.service';
import { AdminsController } from './admin.controller';
import { AdminRepository } from './admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminModule {}
