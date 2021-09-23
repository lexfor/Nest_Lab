import * as mysql from 'mysql2';
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigService } from '@nestjs/config';

const databaseConnectionFactory = async (configService: ConfigService) => {
  return mysql.createConnection({
    user: configService.get('DATABASE_USER'),
    host: configService.get('DATABASE_HOST'),
    database: configService.get('DATABASE_DB'),
    password: configService.get('DATABASE_PASSWORD'),
    port: configService.get('DATABASE_LOCAL_PORT'),
  });
};

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      inject: [ConfigService],
      useFactory: databaseConnectionFactory,
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
