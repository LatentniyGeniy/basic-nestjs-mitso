import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../environments';
import { AdminsService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(private adminService: AdminsService) {}

  gettingToken = async (
    userLogin: string,
    userPassword: string,
  ): Promise<string | null> => {
    const user = await this.adminService.findByCredentials(
      userLogin,
      userPassword,
    );
    if (!user) {
      return null;
    }
    const { id, login } = user;
    const token = jwt.sign({ id, login }, <jwt.Secret>JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  };
}
