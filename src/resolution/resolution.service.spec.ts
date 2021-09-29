import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ResolutionService } from './resolution.service';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { Resolution } from './interfaces/resolution.interface';
import { ConfigModule } from '@nestjs/config';

describe('QueueService', () => {
  let resolutionService: ResolutionService;

  const MockResolutionRepository = {
    addResolution: jest.fn(),
    getAllResolutions: jest.fn(),
    deleteResolution: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        {
          provide: 'RESOLUTION_REPOSITORY',
          useValue: MockResolutionRepository,
        },
        ResolutionService,
      ],
    }).compile();

    resolutionService = module.get<ResolutionService>(ResolutionService);
  });

  describe('add resolution', () => {
    it('success resolution add', async () => {
      const createResolutionDto: CreateResolutionDto = {
        value: 'good',
        patient_id: '1111',
        doctor_name: 'Tim',
        doctor_specialization: 'surgeon',
      };
      MockResolutionRepository.addResolution.mockImplementation(
        async (resolution: Resolution): Promise<Resolution> => {
          expect(resolution.value).toEqual('good');
          expect(resolution.patient_id).toEqual('1111');
          expect(resolution.doctor_name).toEqual('Tim');
          expect(resolution.doctor_specialization).toEqual('surgeon');
          return resolution;
        },
      );

      await resolutionService.create(createResolutionDto);
    });
  });

  describe('get all resolutions', () => {
    it('success resolutions get', async () => {
      MockResolutionRepository.getAllResolutions.mockImplementation(
        async (patientID: string): Promise<Resolution[]> => {
          expect(patientID).toEqual('1111');
          return [
            {
              id: '2222',
              value: 'good',
              delay: 30000,
              createdTime: '19999999',
              patient_id: patientID,
              doctor_name: 'Tim',
              doctor_specialization: 'surgeon',
            },
            {
              id: '3333',
              value: 'bad',
              delay: 30000,
              createdTime: '29999999',
              patient_id: patientID,
              doctor_name: 'Dima',
              doctor_specialization: 'therapist',
            },
          ];
        },
      );

      expect(await resolutionService.getAllResolutions('1111')).toEqual([
        {
          id: '2222',
          value: 'good',
          delay: 30000,
          createdTime: '19999999',
          patient_id: '1111',
          doctor_name: 'Tim',
          doctor_specialization: 'surgeon',
        },
        {
          id: '3333',
          value: 'bad',
          delay: 30000,
          createdTime: '29999999',
          patient_id: '1111',
          doctor_name: 'Dima',
          doctor_specialization: 'therapist',
        },
      ]);
    });
  });

  describe('delete resolution', () => {
    it('success resolutions delete', async () => {
      MockResolutionRepository.deleteResolution.mockImplementation(
        async (resolutionID: string): Promise<string> => {
          expect(resolutionID).toEqual('1111');
          return resolutionID;
        },
      );

      expect(await resolutionService.deleteResolution('1111')).toEqual('1111');
    });
  });
});
