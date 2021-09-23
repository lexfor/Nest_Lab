import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { SQLRepository } from './auth.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_REPOSITORY',
      useClass: SQLRepository,
    },
    AuthService,
  ],
})
export class AuthModule {}
