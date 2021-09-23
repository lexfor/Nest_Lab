import {
  Controller,
  Post,
  Body,
  Dependencies,
  HttpCode,
  HttpStatus,
  Query,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { PatientService } from '../patient/patient.service';

@Controller('api/auth')
@Dependencies(AuthService)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(PatientService) private readonly patientService: PatientService,
  ) {}

  @Post('registration')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.authService.create(createUserDto);
    const createPatientDto = {
      mail: createUserDto.login,
      name: createUserDto.name,
      gender: createUserDto.gender,
      birthday: createUserDto.birthday,
      user_id: user.id,
    };
    await this.patientService.create(createPatientDto);
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Query('role') role: string,
  ): Promise<User> {
    return await this.authService.login(loginUserDto, role);
  }
}
