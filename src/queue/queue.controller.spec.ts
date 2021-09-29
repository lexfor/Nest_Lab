import { Test, TestingModule } from '@nestjs/testing';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { PatientService } from '../patient/patient.service';
import { DoctorService } from '../doctor/doctor.service';
import { Patient } from '../patient/interfaces/patient.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Doctor } from '../doctor/interfaces/doctor.interface';

describe('QueueController', () => {
  let queueController: QueueController;

  const MockQueueService = {
    checkIsPatientInQueue: jest.fn(),
    addPatientInQueue: jest.fn(),
    getCurrentInQueue: jest.fn(),
    takeNextFromQueue: jest.fn(),
  };

  const MockPatientService = {
    getPatientByUserID: jest.fn(),
    getPatientByID: jest.fn(),
  };

  const MockDoctorService = {
    getDoctorByUserID: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueController],
      providers: [
        {
          provide: QueueService,
          useValue: MockQueueService,
        },
        {
          provide: PatientService,
          useValue: MockPatientService,
        },
        {
          provide: DoctorService,
          useValue: MockDoctorService,
        },
      ],
    }).compile();

    queueController = module.get<QueueController>(QueueController);
  });

  describe('add me in queue', () => {
    it('success patient add in queue', async () => {
      MockPatientService.getPatientByUserID.mockImplementation(
        async (userID: string): Promise<Patient> => {
          expect(userID).toEqual('1111');
          return {
            id: '2222',
            name: 'Tim',
            mail: 'thetim182001@mail.ru',
            user_id: userID,
            gender: 'male',
            birthday: '2001-02-18',
          };
        },
      );

      MockQueueService.checkIsPatientInQueue.mockImplementation(
        async (queueID: string, patientID: string): Promise<void> => {
          expect(queueID).toEqual('1234');
          expect(patientID).toEqual('2222');
        },
      );

      MockQueueService.addPatientInQueue.mockImplementation(
        async (queueID: string, patientID: string): Promise<number> => {
          expect(queueID).toEqual('1234');
          expect(patientID).toEqual('2222');
          return 1;
        },
      );

      expect(await queueController.addMeInQueue('1234', '1111')).toEqual(1);
    });
  });

  describe('add me in queue', () => {
    it('fail patient add in queue', async () => {
      MockPatientService.getPatientByUserID.mockImplementation(
        async (userID: string): Promise<Patient> => {
          expect(userID).toEqual('1111');
          return {
            id: '2222',
            name: 'Tim',
            mail: 'thetim182001@mail.ru',
            user_id: userID,
            gender: 'male',
            birthday: '2001-02-18',
          };
        },
      );

      MockQueueService.checkIsPatientInQueue.mockImplementation(
        async (queueID: string, patientID: string): Promise<void> => {
          expect(queueID).toEqual('1234');
          expect(patientID).toEqual('2222');
          throw new HttpException(
            'Patient already in queue',
            HttpStatus.CONFLICT,
          );
        },
      );

      try {
        await queueController.addMeInQueue('1234', '1111');
      } catch (e) {
        expect(e.message).toEqual('Patient already in queue');
      }
    });
  });

  describe('get current in my queue', () => {
    it('success patient get', async () => {
      MockDoctorService.getDoctorByUserID.mockImplementation(
        async (userID: string): Promise<Doctor> => {
          expect(userID).toEqual('1111');
          return {
            id: '2222',
            first_name: 'Oleg',
            email: 'oleg.mail.ru',
            name: 'surgeon',
            user_id: '3333',
          };
        },
      );

      MockQueueService.getCurrentInQueue.mockImplementation(
        async (queueID: string): Promise<string> => {
          expect(queueID).toEqual('2222');
          return '4444';
        },
      );

      MockPatientService.getPatientByID.mockImplementation(
        async (patientID: string): Promise<Patient> => {
          expect(patientID).toEqual('4444');
          return {
            id: patientID,
            name: 'Tim',
            mail: 'thetim182001@mail.ru',
            user_id: '5555',
            gender: 'male',
            birthday: '2001-02-18',
          };
        },
      );

      expect(await queueController.getCurrentInMyQueue('1111')).toEqual({
        id: '4444',
        name: 'Tim',
        mail: 'thetim182001@mail.ru',
        user_id: '5555',
        gender: 'male',
        birthday: '2001-02-18',
      });
    });
  });

  describe('get current in queue', () => {
    it('success patient get', async () => {
      MockQueueService.getCurrentInQueue.mockImplementation(
        async (queueID: string): Promise<string> => {
          expect(queueID).toEqual('1111');
          return '2222';
        },
      );

      MockPatientService.getPatientByID.mockImplementation(
        async (patientID: string): Promise<Patient> => {
          expect(patientID).toEqual('2222');
          return {
            id: patientID,
            name: 'Tim',
            mail: 'thetim182001@mail.ru',
            user_id: '3333',
            gender: 'male',
            birthday: '2001-02-18',
          };
        },
      );

      expect(await queueController.getCurrentInQueue('1111')).toEqual({
        id: '2222',
        name: 'Tim',
        mail: 'thetim182001@mail.ru',
        user_id: '3333',
        gender: 'male',
        birthday: '2001-02-18',
      });
    });
  });

  describe('take nest from queue', () => {
    it('success patient get', async () => {
      MockDoctorService.getDoctorByUserID.mockImplementation(
        async (userID: string): Promise<Doctor> => {
          expect(userID).toEqual('1111');
          return {
            id: '2222',
            first_name: 'Oleg',
            email: 'oleg.mail.ru',
            name: 'surgeon',
            user_id: userID,
          };
        },
      );

      MockQueueService.takeNextFromQueue.mockImplementation(
        async (queueID: string): Promise<string> => {
          expect(queueID).toEqual('2222');
          return '3333';
        },
      );

      MockPatientService.getPatientByID.mockImplementation(
        async (patientID: string): Promise<Patient> => {
          expect(patientID).toEqual('3333');
          return {
            id: patientID,
            name: 'Tim',
            mail: 'thetim182001@mail.ru',
            user_id: '4444',
            gender: 'male',
            birthday: '2001-02-18',
          };
        },
      );

      expect(await queueController.takeNextInMyQueue('1111')).toEqual({
        id: '3333',
        name: 'Tim',
        mail: 'thetim182001@mail.ru',
        user_id: '4444',
        gender: 'male',
        birthday: '2001-02-18',
      });
    });
  });
});
