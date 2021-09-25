import { ConfigService } from '@nestjs/config';
import { Connection } from 'mysql2';
import * as mysql from 'mysql2';

export const getDatabaseConnection = (
  configService: ConfigService,
): Connection => {
  return mysql.createConnection({
    user: configService.get('DATABASE_USER'),
    host: configService.get('DATABASE_HOST'),
    database: configService.get('DATABASE_DB'),
    password: configService.get('DATABASE_PASSWORD'),
    port: configService.get('DATABASE_LOCAL_PORT'),
  });
};
