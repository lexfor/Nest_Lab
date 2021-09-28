import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { Patient } from './interfaces/patient.interface';
import e from 'express';

describe('PatientController', () => {
  let patientController: PatientController;

  const MockPatientService = {
    getAllPatients: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: MockPatientService,
        },
      ],
    }).compile();

    patientController = module.get<PatientController>(PatientController);
  });

  describe('full text search', () => {
    it('success patient search', async () => {
      MockPatientService.getAllPatients.mockImplementation(
        async (patientInfo: string): Promise<Patient[]> => {
          expect(patientInfo).toEqual('a');
          return [
            {
              id: '1111',
              name: 'Tim',
              mail: 'thetim182001@mail.ru',
              user_id: '1212',
              gender: 'male',
              birthday: '2001-02-18',
            },
            {
              id: '2222',
              name: 'Dima',
              mail: 'dima@mail.ru',
              user_id: '2121',
              gender: 'male',
              birthday: '2001-02-18',
            },
          ];
        },
      );
      expect(await patientController.findPatient('a')).toEqual([
        {
          id: '1111',
          name: 'Tim',
          mail: 'thetim182001@mail.ru',
          user_id: '1212',
          gender: 'male',
          birthday: '2001-02-18',
        },
        {
          id: '2222',
          name: 'Dima',
          mail: 'dima@mail.ru',
          user_id: '2121',
          gender: 'male',
          birthday: '2001-02-18',
        },
      ]);
    });
  });
});
