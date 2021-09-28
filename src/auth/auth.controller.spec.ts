import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PatientService } from '../patient/patient.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
import { User } from './interfaces/user.interface';
import { Patient } from '../patient/interfaces/patient.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { Token } from './interfaces/token.interface';

describe('AuthController', () => {
  let authController: AuthController;

  const MockAuthService = {
    isExist: jest.fn(),
    createUser: jest.fn(),
    findUser: jest.fn(),
    login: jest.fn(),
  };

  const MockPatientService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: MockAuthService,
        },
        {
          provide: PatientService,
          useValue: MockPatientService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
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
      MockAuthService.isExist.mockImplementation(
        async (login: string): Promise<void> => {
          expect(login).toEqual('thetim182001@mail.ru');
        },
      );

      MockAuthService.createUser.mockImplementation(
        async (user: CreateUserDto): Promise<User> => {
          expect(user).toEqual(createUserDto);
          return {
            id: '1111',
            login: user.login,
            password: user.password,
          };
        },
      );

      MockPatientService.create.mockImplementation(
        async (patient: CreatePatientDto): Promise<Patient> => {
          expect(patient).toEqual({
            mail: createUserDto.login,
            name: createUserDto.name,
            gender: createUserDto.gender,
            birthday: createUserDto.birthday,
            user_id: '1111',
          });
          return {
            id: '2222',
            name: patient.name,
            birthday: patient.birthday,
            gender: patient.birthday,
            mail: patient.mail,
            user_id: patient.user_id,
          };
        },
      );

      await authController.createUser(createUserDto);
    });
  });

  describe('create user', () => {
    it('fail user create', async () => {
      const createUserDto: CreateUserDto = {
        login: 'thetim182001@mail.ru',
        password: '12345678',
        name: 'Tim',
        birthday: '18-02-2001',
        gender: 'mail',
      };
      MockAuthService.isExist.mockImplementation(
        async (login: string): Promise<void> => {
          expect(login).toEqual('thetim182001@mail.ru');
          throw new HttpException('user already exist', HttpStatus.CONFLICT);
        },
      );

      try {
        await authController.createUser(createUserDto);
      } catch (e) {
        expect(e.message).toEqual('user already exist');
      }
    });
  });

  describe('login user', () => {
    it('success user login', async () => {
      const loginUserDto: LoginUserDto = {
        login: 'thetim182001@mail.ru',
        password: '12345678',
      };
      MockAuthService.findUser.mockImplementation(
        async (loginUserDto: LoginUserDto): Promise<User> => {
          expect(loginUserDto).toEqual({
            login: 'thetim182001@mail.ru',
            password: '12345678',
          });
          return {
            id: '1111',
            login: loginUserDto.login,
            password: loginUserDto.password,
          };
        },
      );

      MockAuthService.login.mockImplementation(
        async (user: User): Promise<Token> => {
          expect(user).toEqual({
            id: '1111',
            login: loginUserDto.login,
            password: loginUserDto.password,
          });
          return {
            token: '2222',
          };
        },
      );

      await authController.login(loginUserDto, 'patient');
    });
  });

  describe('login user', () => {
    it('wrong mail', async () => {
      const loginUserDto: LoginUserDto = {
        login: 'thetim182001@mail.ru',
        password: '12345678',
      };
      MockAuthService.findUser.mockImplementation(
        async (loginUserDto: LoginUserDto): Promise<User> => {
          expect(loginUserDto).toEqual({
            login: 'thetim182001@mail.ru',
            password: '12345678',
          });
          throw new HttpException('Wrong login', HttpStatus.UNAUTHORIZED);
        },
      );

      try {
        await authController.login(loginUserDto, 'patient');
      } catch (e) {
        expect(e.message).toEqual('Wrong login');
      }
    });
  });

  describe('login user', () => {
    it('wrong password', async () => {
      const loginUserDto: LoginUserDto = {
        login: 'thetim182001@mail.ru',
        password: '12345678',
      };
      MockAuthService.findUser.mockImplementation(
        async (loginUserDto: LoginUserDto): Promise<User> => {
          expect(loginUserDto).toEqual({
            login: 'thetim182001@mail.ru',
            password: '12345678',
          });
          throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
        },
      );

      try {
        await authController.login(loginUserDto, 'patient');
      } catch (e) {
        expect(e.message).toEqual('Wrong password');
      }
    });
  });
});
