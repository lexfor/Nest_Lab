import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthRepository } from './interfaces/repository.interface';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { v1 as uuidv1 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Token } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY') private readonly repository: AuthRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const cryptUser: User = {
      id: uuidv1(),
      login: createUserDto.login,
      password: await bcrypt.hashSync(
        createUserDto.password,
        +this.config.get('SALT'),
      ),
    };
    return this.repository.createUser(cryptUser);
  }

  async findUser(loginUserDto: LoginUserDto, role: string): Promise<User> {
    const user: User = await this.repository.getUser(loginUserDto.login, role);
    if (!user) {
      throw new HttpException('Wrong login', HttpStatus.UNAUTHORIZED);
    }
    if (await bcrypt.compareSync(loginUserDto.password, user.password)) {
      return user;
    }
    throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
  }

  async login({ id }: User): Promise<Token> {
    return {
      token: await this.jwtService.signAsync({ id }),
    };
  }
}
