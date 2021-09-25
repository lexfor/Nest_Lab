import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../helpers/database/database.module';
import { SQLRepository } from './auth.repository';
import { PatientModule } from '../patient/patient.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../helpers/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { DatabaseService } from '../helpers/database/database.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    PatientModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_REPOSITORY',
      useClass: SQLRepository,
    },
    ConfigService,
    AuthService,
    DatabaseService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
