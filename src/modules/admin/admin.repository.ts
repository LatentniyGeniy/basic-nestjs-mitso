import { EntityRepository, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './admin.entity';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  createAdmin(admin: CreateAdminDto) {
    return this.create(admin);
  }

  getAllAdmins() {
    return this.find();
  }

  getAdminById(id: string) {
    return this.findOne({ id });
  }

  updateAdminById(id: string, admin: UpdateAdminDto) {
    return this.update({ id }, admin);
  }

  deleteAdminById(id: string) {
    return this.delete({ id });
  }

  findByCredentials(login: string) {
    return this.findOne({ login });
  }
}
