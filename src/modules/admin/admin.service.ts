import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminsService {
  constructor(private readonly adminsRepository: AdminRepository) {}

  createAdmin = async (data: CreateAdminDto): Promise<Admin> => {
    const admin = await this.adminsRepository.createAdmin(data);
    return admin;
  };

  getAll = async (): Promise<Admin[]> => this.adminsRepository.getAllAdmins();

  getById = async (id: string): Promise<Admin | null> => {
    const admin = await this.adminsRepository.getAdminById(id);
    if (!admin) return null;
    return admin;
  };

  findByCredentials = async (
    login: string,
    password: string,
  ): Promise<Admin | null> => {
    const admin = await this.adminsRepository.findByCredentials(login);
    if (!admin) return null;
    const passwordVerification = await bcrypt.compare(password, admin.password);
    if (!passwordVerification) return null;
    return admin;
  };

  deleteById = async (id: string): Promise<Admin | null> => {
    const adminDeletable = await this.adminsRepository.getAdminById(id);
    if (!adminDeletable) return null;
    await this.adminsRepository.deleteAdminById(id);

    return adminDeletable;
  };

  updateById = async (
    id: string,
    data: UpdateAdminDto,
  ): Promise<Admin | null> => {
    await this.adminsRepository.updateAdminById(id, data);
    const admin = await this.adminsRepository.getAdminById(id);
    if (!admin) return null;
    return admin;
  };
}
