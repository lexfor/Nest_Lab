import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../helpers/database/database.module';
import { PatientModule } from '../patient/patient.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../helpers/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { SQLRepository } from './auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        AuthService,
        JwtStrategy,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
