import {
  Controller,
  Post,
  Body,
  Dependencies,
  HttpCode,
  HttpStatus,
  Query,
  Inject,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './interfaces/user.interface';
import { PatientService } from '../patient/patient.service';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
import { Token } from './interfaces/token.interface';

@Controller('api/auth')
@Dependencies(AuthService)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(PatientService) private readonly patientService: PatientService,
  ) {}

  @Post('registration')
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<void> {
    await this.authService.isExist(createUserDto.login);
    const user = await this.authService.createUser(createUserDto);
    const createPatientDto: CreatePatientDto = {
      mail: createUserDto.login,
      name: createUserDto.name,
      gender: createUserDto.gender,
      birthday: createUserDto.birthday,
      user_id: user.id,
    };
    await this.patientService.create(createPatientDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
    @Query('role', new DefaultValuePipe('patient')) role: string,
  ): Promise<Token> {
    const user: User = await this.authService.findUser(loginUserDto, role);
    return await this.authService.login(user);
  }
}
