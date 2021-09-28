import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Token } from './interfaces/token.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  const MockAuthRepository = {
    createUser: jest.fn(),
    getUser: jest.fn(),
  };

  const MockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        {
          provide: 'AUTH_REPOSITORY',
          useValue: MockAuthRepository,
        },
        {
          provide: JwtService,
          useValue: MockJwtService,
        },
        AuthService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('create user', () => {
    it('success user create', async () => {
      const createUserDto: CreateUserDto = {
        login: 'thetim182001@mail.ru',
        password: '12345678',
        name: 'Tim',
        birthday: '18-02-2001',
        gender: 'mail',
      };
      MockAuthRepository.createUser.mockImplementation(
        async (user: User): Promise<User> => {
          expect(user.login).toEqual('thetim182001@mail.ru');
          return user;
        },
      );
      await authService.createUser(createUserDto);
    });
  });

  describe('find user', () => {
    it('success user find', async () => {
      const loginUserDto: LoginUserDto = {
        login: 'thetim182001@mail.ru',
        password: '12345678',
      };
      MockAuthRepository.getUser.mockImplementation(
        async (login: string, role: string): Promise<User> => {
          expect(login).toEqual('thetim182001@mail.ru');
          expect(role).toEqual('patient');
          return {
            login: login,
            password:
              '$2a$10$MvyFbfVhcjdYaWrBLxrz7egf/ynUUMQ9sZx/vEZhmhEfG2WT3PoU2',
            id: '1111',
          };
        },
      );
      await authService.findUser(loginUserDto, 'patient');
    });
  });

  describe('find user', () => {
    it('wrong password', async () => {
      const loginUserDto: LoginUserDto = {
        login: 'thetim182001@mail.ru',
        password: '111111',
      };
      MockAuthRepository.getUser.mockImplementation(
        async (login: string, role: string): Promise<User> => {
          expect(login).toEqual('thetim182001@mail.ru');
          expect(role).toEqual('patient');
          return {
            login: login,
            password:
              '$2a$10$MvyFbfVhcjdYaWrBLxrz7egf/ynUUMQ9sZx/vEZhmhEfG2WT3PoU2',
            id: '1111',
          };
        },
      );

      try {
        await authService.findUser(loginUserDto, 'patient');
      } catch (e) {
        expect(e.message).toEqual('Wrong password');
      }
    });
  });

  describe('find user', () => {
    it('wrong login', async () => {
      const loginUserDto: LoginUserDto = {
        login: 'thetim182001@mail.ru',
        password: '111111',
      };
      MockAuthRepository.getUser.mockImplementation(
        async (login: string, role: string): Promise<User> => {
          expect(login).toEqual('thetim182001@mail.ru');
          expect(role).toEqual('patient');
          return;
        },
      );

      try {
        await authService.findUser(loginUserDto, 'patient');
      } catch (e) {
        expect(e.message).toEqual('Wrong login');
      }
    });
  });

  describe('login user', () => {
    it('success login', async () => {
      const user: User = {
        id: '1111',
        login: 'thetim182001@mail.ru',
        password:
          '$2a$10$MvyFbfVhcjdYaWrBLxrz7egf/ynUUMQ9sZx/vEZhmhEfG2WT3PoU2',
      };
      MockJwtService.signAsync.mockImplementation(
        async ({ id }: User): Promise<string> => {
          expect(id).toEqual('1111');
          return 'asdfghjkl';
        },
      );

      expect(await authService.login(user)).toEqual({ token: 'asdfghjkl' });
    });
  });

  describe('check is user exist', () => {
    it('success check', async () => {
      const login = 'thetim182001@mail.ru';
      MockAuthRepository.getUser.mockImplementation(
        async (login: string, role: string): Promise<User> => {
          expect(role).toEqual('patient');
          expect(login).toEqual('thetim182001@mail.ru');
          return {
            id: '1111',
            login: login,
            password: '12345678',
          };
        },
      );

      try {
        await authService.isExist(login, 'patient');
      } catch (e) {
        expect(e.message).toEqual('User already exist');
      }
    });
  });

  describe('check is user exist', () => {
    it('success check', async () => {
      const login = 'thetim182001@mail.ru';
      MockAuthRepository.getUser.mockImplementation(
        async (login: string, role: string): Promise<User> => {
          expect(role).toEqual('patient');
          expect(login).toEqual('thetim182001@mail.ru');
          return;
        },
      );

      await authService.isExist(login, 'patient');
    });
  });
});
