import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from '../patient/patient.service';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
import { Patient } from '../patient/interfaces/patient.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { Specialization } from './interfaces/specialization.interface';
import { Doctor } from './interfaces/doctor.interface';

describe('AuthController', () => {
  let doctorController: DoctorController;

  const MockDoctorService = {
    findDoctorByUserID: jest.fn(),
    getAllSpecializations: jest.fn(),
    getDoctorsBySpecialization: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        {
          provide: DoctorService,
          useValue: MockDoctorService,
        },
      ],
    }).compile();

    doctorController = module.get<DoctorController>(DoctorController);
  });

  describe('get all doctors specializations', () => {
    it('success get all specializations', async () => {
      MockDoctorService.getAllSpecializations.mockImplementation(
        async (): Promise<Specialization[]> => {
          return [
            { id: '1111', name: 'therapist' },
            { id: '2222', name: 'surgeon' },
          ];
        },
      );
      expect(await doctorController.getAllSpecializations()).toEqual([
        { id: '1111', name: 'therapist' },
        { id: '2222', name: 'surgeon' },
      ]);
    });
  });

  describe('get all doctors with specialization', () => {
    it('success get all doctors', async () => {
      MockDoctorService.getDoctorsBySpecialization.mockImplementation(
        async (id: string): Promise<Doctor> => {
          expect(id).toEqual('1111');
          return {
            id: '2222',
            first_name: 'Dima',
            email: 'dima.mitrichenko@mail.ru',
            name: 'therapist',
            user_id: '3333',
          };
        },
      );
      expect(await doctorController.getDoctorsBySpecialization('1111')).toEqual(
        {
          id: '2222',
          first_name: 'Dima',
          email: 'dima.mitrichenko@mail.ru',
          name: 'therapist',
          user_id: '3333',
        },
      );
    });
  });
});
