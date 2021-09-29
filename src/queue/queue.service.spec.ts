import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from './queue.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Patient } from '../patient/interfaces/patient.interface';

describe('QueueService', () => {
  let queueService: QueueService;

  const MockQueueRepository = {
    addPatientInQueue: jest.fn(),
    getCurrentInQueue: jest.fn(),
    takeNextFromQueue: jest.fn(),
    getAllPatientsFromQueue: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'QUEUE_REPOSITORY',
          useValue: MockQueueRepository,
        },
        QueueService,
      ],
    }).compile();

    queueService = module.get<QueueService>(QueueService);
  });

  describe('add patient in queue', () => {
    it('success patient add', async () => {
      MockQueueRepository.addPatientInQueue.mockImplementation(
        async (queueID: string, patientID: string): Promise<string> => {
          expect(queueID).toEqual('1111');
          expect(patientID).toEqual('2222');
          return patientID;
        },
      );

      MockQueueRepository.getAllPatientsFromQueue.mockImplementation(
        async (queueID: string): Promise<string[]> => {
          expect(queueID).toEqual('1111');
          return ['2222', '3333', '4444'];
        },
      );

      expect(await queueService.addPatientInQueue('1111', '2222')).toEqual(3);
    });
  });

  describe('get current patient in queue', () => {
    it('success patient get', async () => {
      MockQueueRepository.getCurrentInQueue.mockImplementation(
        async (queueID: string): Promise<string> => {
          expect(queueID).toEqual('1111');
          return '2222';
        },
      );

      expect(await queueService.getCurrentInQueue('1111')).toEqual('2222');
    });
  });

  describe('get current patient in queue', () => {
    it('fail patient get', async () => {
      MockQueueRepository.getCurrentInQueue.mockImplementation(
        async (queueID: string): Promise<string> => {
          expect(queueID).toEqual('1111');
          throw new HttpException('No patients in queue', HttpStatus.NOT_FOUND);
        },
      );

      try {
        await queueService.getCurrentInQueue('1111');
      } catch (e) {
        expect(e.message).toEqual('No patients in queue');
      }
    });
  });

  describe('take next from queue', () => {
    it('success take next', async () => {
      MockQueueRepository.takeNextFromQueue.mockImplementation(
        async (queueID: string): Promise<void> => {
          expect(queueID).toEqual('1111');
        },
      );

      MockQueueRepository.getCurrentInQueue.mockImplementation(
        async (queueID: string): Promise<string> => {
          expect(queueID).toEqual('1111');
          return '2222';
        },
      );

      expect(await queueService.getCurrentInQueue('1111')).toEqual('2222');
    });
  });

  describe('get current patient in queue', () => {
    it('fail patient get', async () => {
      MockQueueRepository.takeNextFromQueue.mockImplementation(
        async (queueID: string): Promise<void> => {
          expect(queueID).toEqual('1111');
        },
      );

      MockQueueRepository.getCurrentInQueue.mockImplementation(
        async (queueID: string): Promise<string> => {
          expect(queueID).toEqual('1111');
          return '';
        },
      );

      try {
        await queueService.getCurrentInQueue('1111');
      } catch (e) {
        expect(e.message).toEqual('No patients in queue');
      }
    });
  });

  describe('check is patient in queue', () => {
    it('success queue check', async () => {
      MockQueueRepository.getAllPatientsFromQueue.mockImplementation(
        async (queueID: string): Promise<string[]> => {
          expect(queueID).toEqual('1111');
          return ['1234', '5678'];
        },
      );

      try {
        await queueService.checkIsPatientInQueue('1111', '1234');
      } catch (e) {
        expect(e.message).toEqual('Patient already in queue');
      }
    });
  });

  describe('check is patient in queue', () => {
    it('fail queue check', async () => {
      MockQueueRepository.getAllPatientsFromQueue.mockImplementation(
        async (queueID: string): Promise<string[]> => {
          expect(queueID).toEqual('1111');
          return ['1234', '5678'];
        },
      );

      await queueService.checkIsPatientInQueue('1111', '2345');
    });
  });
});
