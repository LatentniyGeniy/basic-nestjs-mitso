import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpExceptionFilter } from "../../common";

import { AdminsService } from './admin.service';
import { Admin } from './admin.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('admins')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('/')
  async getAll(@Req() _req: Request, @Res() res: Response) {
    const users = await this.adminsService.getAll();
    return res.status(StatusCodes.OK).json(users.map(Admin.toResponse));
  }

  @Post('/')
  async createUser(@Req() req: Request, @Res() res: Response) {
    const user = await this.adminsService.createAdmin(req.body);

    if (user) {
      res.status(StatusCodes.CREATED).json(Admin.toResponse(user));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
    }
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const user = await this.adminsService.getById(id || '');

    if (user) {
      res.json(Admin.toResponse(user));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  }

  @Put('/:id')
  async updateAdmin(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const user = await this.adminsService.updateById(id!, req.body);

    if (user) {
      res.status(StatusCodes.OK).json(Admin.toResponse(user));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  }

  @Delete('/:id')
  async deleteById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const user = await this.adminsService.deleteById(id || '');

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'USER_DELETED', msg: 'The user has been deleted' });
  }
}
