import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthRepository } from './interfaces/repository.interface';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_REPOSITORY') private repository: AuthRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const cryptUser = {
      id: uuidv1(),
      login: createUserDto.login,
      password: await bcrypt.hashSync(createUserDto.password, 10),
    };
    return this.repository.createUser(cryptUser);
  }

  async login(loginUserDto: LoginUserDto, role: string): Promise<User> {
    const user = await this.repository.getUser(loginUserDto.login, role);
    if (!user) {
      throw new HttpException('Wrong login', HttpStatus.UNAUTHORIZED);
    }
    if (await bcrypt.compareSync(loginUserDto.password, user.password)) {
      return user;
    }
    throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
  }
}
