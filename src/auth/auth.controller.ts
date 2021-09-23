import {
  Controller,
  Post,
  Body,
  Dependencies,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.enity';

@Controller('api/auth')
@Dependencies(AuthService)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.create(createUserDto);
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
