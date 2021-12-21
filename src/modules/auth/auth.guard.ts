import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../environments';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate = async (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const sessionToken = request.headers.authorization?.split(' ')[2];
    try {
      if (!sessionToken)
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      jwt.verify(sessionToken, JWT_SECRET_KEY);
      return true;
    } catch (err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  };
}
