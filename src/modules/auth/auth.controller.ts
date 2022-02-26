import { Controller, Post, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async makeLogging(@Req() req: Request, @Res() res: Response) {
    const { login, password } = req.body;

    const token = await this.authService.gettingToken(login, password);
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).send({
        auth: false,
        error: 'Login failed! Check authentication credentials',
      });
    }
    return res.status(StatusCodes.OK).json({ auth: true, token });
  }
}
