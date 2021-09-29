import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from './doctor.service';
import { Doctor } from './interfaces/doctor.interface';
import { Specialization } from './interfaces/specialization.interface';

describe('DoctorService', () => {
  let doctorService: DoctorService;

  const MockDoctorRepository = {
    getDoctorByUserID: jest.fn(),
    getAllSpecializations: jest.fn(),
    getDoctorsBySpecialization: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'DOCTOR_REPOSITORY',
          useValue: MockDoctorRepository,
        },
        DoctorService,
      ],
    }).compile();

    doctorService = module.get<DoctorService>(DoctorService);
  });

  describe('find doctor by user ID', () => {
    it('success find user', async () => {
      MockDoctorRepository.getDoctorByUserID.mockImplementation(
        async (userID: string): Promise<Doctor> => {
          expect(userID).toEqual('1111');
          return {
            id: '2222',
            first_name: 'Dima',
            email: 'dima.mitrichenko@mail.ru',
            name: 'therapist',
            user_id: userID,
          };
        },
      );
      expect(await doctorService.getDoctorByUserID('1111')).toEqual({
        id: '2222',
        first_name: 'Dima',
        email: 'dima.mitrichenko@mail.ru',
        name: 'therapist',
        user_id: '1111',
      });
    });
  });

  describe('get all doctor specializations', () => {
    it('success find specializations', async () => {
      MockDoctorRepository.getAllSpecializations.mockImplementation(
        async (): Promise<Specialization[]> => {
          return [
            { id: '1111', name: 'therapist' },
            { id: '2222', name: 'surgeon' },
          ];
        },
      );
      expect(await doctorService.getAllSpecializations()).toEqual([
        { id: '1111', name: 'therapist' },
        { id: '2222', name: 'surgeon' },
      ]);
    });
  });

  describe('get all doctors by specializations ID', () => {
    it('success find doctors by specialization ID', async () => {
      MockDoctorRepository.getDoctorsBySpecialization.mockImplementation(
        async (SpecializationID: string): Promise<Doctor[]> => {
          expect(SpecializationID).toEqual('1111');
          return [
            {
              id: '2222',
              first_name: 'Dima',
              email: 'dima.mitrichenko@mail.ru',
              name: 'therapist',
              user_id: '3333',
            },
          ];
        },
      );
      expect(await doctorService.getDoctorsBySpecialization('1111')).toEqual([
        {
          id: '2222',
          first_name: 'Dima',
          email: 'dima.mitrichenko@mail.ru',
          name: 'therapist',
          user_id: '3333',
        },
      ]);
    });
  });
});
