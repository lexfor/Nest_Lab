import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { Patient } from './interfaces/patient.interface';
import { CreatePatientDto } from './dto/create-patient.dto';

describe('PatientService', () => {
  let patientService: PatientService;

  const MockPatientRepository = {
    createPatient: jest.fn(),
    findPatientByUserID: jest.fn(),
    getAllPatients: jest.fn(),
    getPatientByID: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'PATIENT_REPOSITORY',
          useValue: MockPatientRepository,
        },
        PatientService,
      ],
    }).compile();

    patientService = module.get<PatientService>(PatientService);
  });

  describe('create patient', () => {
    it('success patient create', async () => {
      const createPatientDto: CreatePatientDto = {
        mail: 'thetim182001@mail.ru',
        name: 'Tim',
        birthday: '2001-02-18',
        gender: 'male',
        user_id: '1111',
      };
      MockPatientRepository.createPatient.mockImplementation(
        async (patientDto: CreatePatientDto): Promise<Patient> => {
          expect(patientDto.name).toEqual('Tim');
          expect(patientDto.birthday).toEqual('2001-02-18');
          expect(patientDto.mail).toEqual('thetim182001@mail.ru');
          expect(patientDto.gender).toEqual('male');
          expect(patientDto.user_id).toEqual('1111');
          return {
            id: '2222',
            ...createPatientDto,
          };
        },
      );
      expect(await patientService.createPatient(createPatientDto)).toEqual({
        id: '2222',
        mail: 'thetim182001@mail.ru',
        name: 'Tim',
        birthday: '2001-02-18',
        gender: 'male',
        user_id: '1111',
      });
    });
  });

  describe('get patient by user ID', () => {
    it('success patient find', async () => {
      MockPatientRepository.findPatientByUserID.mockImplementation(
        async (userID: string): Promise<Patient> => {
          expect(userID).toEqual('1111');
          return {
            id: '2222',
            name: 'Tim',
            birthday: '2001-02-18',
            gender: 'male',
            mail: 'thetim182001@mail.ru',
            user_id: userID,
          };
        },
      );
      expect(await patientService.getPatientByUserID('1111')).toEqual({
        id: '2222',
        mail: 'thetim182001@mail.ru',
        name: 'Tim',
        birthday: '2001-02-18',
        gender: 'male',
        user_id: '1111',
      });
    });
  });

  describe('get all patients', () => {
    it('success patients find', async () => {
      MockPatientRepository.getAllPatients.mockImplementation(
        async (patientInfo: string): Promise<Patient[]> => {
          expect(patientInfo).toEqual('a');
          return [
            {
              id: '2222',
              name: 'Tim',
              birthday: '2001-02-18',
              gender: 'male',
              mail: 'thetim182001@mail.ru',
              user_id: '1111',
            },
            {
              id: '3333',
              name: 'Dima',
              birthday: '2001-02-18',
              gender: 'male',
              mail: 'dima.mitrichenko@mail.ru',
              user_id: '4444',
            },
          ];
        },
      );
      expect(await patientService.getAllPatients('a')).toEqual([
        {
          id: '2222',
          name: 'Tim',
          birthday: '2001-02-18',
          gender: 'male',
          mail: 'thetim182001@mail.ru',
          user_id: '1111',
        },
        {
          id: '3333',
          name: 'Dima',
          birthday: '2001-02-18',
          gender: 'male',
          mail: 'dima.mitrichenko@mail.ru',
          user_id: '4444',
        },
      ]);
    });
  });

  describe('get patient by ID', () => {
    it('success patients find', async () => {
      MockPatientRepository.getPatientByID.mockImplementation(
        async (patientID: string): Promise<Patient> => {
          expect(patientID).toEqual('1111');
          return {
            id: patientID,
            name: 'Dima',
            birthday: '2001-02-18',
            gender: 'male',
            mail: 'dima.mitrichenko@mail.ru',
            user_id: '2222',
          };
        },
      );
      expect(await patientService.getPatientByID('1111')).toEqual({
        id: '1111',
        name: 'Dima',
        birthday: '2001-02-18',
        gender: 'male',
        mail: 'dima.mitrichenko@mail.ru',
        user_id: '2222',
      });
    });
  });
});
