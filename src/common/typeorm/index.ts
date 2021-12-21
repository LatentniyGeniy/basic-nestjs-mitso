import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';

import config from '../../config.orm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  createTypeOrmOptions = async (): Promise<TypeOrmModuleOptions> => {
    const options = {
      ...config,
    };
    createConnection(options)
      .then(() => {
        Logger.log(`☁ Database connected`, 'TypeORM', false);
      })
      .catch(() => {
        Logger.error(`❌ Database connect error`, '', 'TypeORM', false);
      });

    return options;
  };
}
