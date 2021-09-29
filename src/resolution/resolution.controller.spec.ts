import { Test, TestingModule } from '@nestjs/testing';
import { ResolutionController } from './resolution.controller';
import { ResolutionService } from './resolution.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PatientService } from '../patient/patient.service';
import { Patient } from '../patient/interfaces/patient.interface';
import { Doctor } from '../doctor/interfaces/doctor.interface';
import { DoctorService } from '../doctor/doctor.service';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { Resolution } from './interfaces/resolution.interface';

describe('ResolutionController', () => {
  let resolutionController: ResolutionController;

  const MockResolutionService = {
    create: jest.fn(),
    getAllResolutions: jest.fn(),
    deleteResolution: jest.fn(),
  };

  const MockPatientService = {
    getPatientByUserID: jest.fn(),
    getPatientByID: jest.fn(),
  };

  const MockDoctorService = {
    findDoctorByUserID: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResolutionController],
      providers: [
        {
          provide: ResolutionService,
          useValue: MockResolutionService,
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

    resolutionController =
      module.get<ResolutionController>(ResolutionController);
  });

  describe('add resolution', () => {
    it('success resolution add', async () => {
      MockDoctorService.findDoctorByUserID.mockImplementation(
        async (userID: string): Promise<Doctor> => {
          expect(userID).toEqual('1111');
          return {
            id: '2222',
            first_name: 'Tim',
            name: 'surgeon',
            email: 'thetim182001@mail.ru',
            user_id: userID,
          };
        },
      );

      MockPatientService.getPatientByID.mockImplementation(
        async (patientID: string): Promise<Patient> => {
          expect(patientID).toEqual('3333');
          return {
            id: patientID,
            name: 'Dima',
            mail: 'dima.mitrichenko@mail.ru',
            birthday: '2000-02-18',
            gender: 'male',
            user_id: '4444',
          };
        },
      );

      MockResolutionService.create.mockImplementation(
        async (
          createResolutionDto: CreateResolutionDto,
        ): Promise<Resolution> => {
          expect(createResolutionDto.value).toEqual('good');
          expect(createResolutionDto.patient_id).toEqual('3333');
          expect(createResolutionDto.doctor_name).toEqual('Tim');
          expect(createResolutionDto.doctor_specialization).toEqual('surgeon');
          return {
            id: '5555',
            value: createResolutionDto.value,
            delay: 30000,
            createdTime: '19999999',
            patient_id: createResolutionDto.patient_id,
            doctor_name: createResolutionDto.doctor_name,
            doctor_specialization: createResolutionDto.doctor_specialization,
          };
        },
      );

      expect(
        await resolutionController.addResolution(
          {
            value: 'good',
          },
          '1111',
          '3333',
        ),
      ).toEqual({
        id: '5555',
        value: 'good',
        delay: 30000,
        createdTime: '19999999',
        patient_id: '3333',
        doctor_name: 'Tim',
        doctor_specialization: 'surgeon',
      });
    });
  });

  describe('get all my resolutions', () => {
    it('success resolution get', async () => {
      MockPatientService.getPatientByUserID.mockImplementation(
        async (userID: string): Promise<Patient> => {
          expect(userID).toEqual('1111');
          return {
            id: '2222',
            name: 'Dima',
            mail: 'dima.mitrichenko@mail.ru',
            birthday: '2000-02-18',
            gender: 'male',
            user_id: userID,
          };
        },
      );

      MockResolutionService.getAllResolutions.mockImplementation(
        async (patientID: string): Promise<Resolution[]> => {
          expect(patientID).toEqual('2222');
          return [
            {
              id: '3333',
              value: 'good',
              delay: 30000,
              createdTime: '19999999',
              patient_id: patientID,
              doctor_name: 'Tim',
              doctor_specialization: 'surgeon',
            },
            {
              id: '4444',
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

      expect(await resolutionController.getAllMyResolutions('1111')).toEqual([
        {
          id: '3333',
          value: 'good',
          delay: 30000,
          createdTime: '19999999',
          patient_id: '2222',
          doctor_name: 'Tim',
          doctor_specialization: 'surgeon',
        },
        {
          id: '4444',
          value: 'bad',
          delay: 30000,
          createdTime: '29999999',
          patient_id: '2222',
          doctor_name: 'Dima',
          doctor_specialization: 'therapist',
        },
      ]);
    });
  });

  describe('get all patient resolutions', () => {
    it('success resolution get', async () => {
      MockPatientService.getPatientByID.mockImplementation(
        async (patientID: string): Promise<Patient> => {
          expect(patientID).toEqual('1111');
          return {
            id: patientID,
            name: 'Dima',
            mail: 'dima.mitrichenko@mail.ru',
            birthday: '2000-02-18',
            gender: 'male',
            user_id: '2222',
          };
        },
      );

      MockResolutionService.getAllResolutions.mockImplementation(
        async (patientID: string): Promise<Resolution[]> => {
          expect(patientID).toEqual('1111');
          return [
            {
              id: '3333',
              value: 'good',
              delay: 30000,
              createdTime: '19999999',
              patient_id: patientID,
              doctor_name: 'Tim',
              doctor_specialization: 'surgeon',
            },
            {
              id: '4444',
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

      expect(await resolutionController.getAllResolutions('1111')).toEqual([
        {
          id: '3333',
          value: 'good',
          delay: 30000,
          createdTime: '19999999',
          patient_id: '1111',
          doctor_name: 'Tim',
          doctor_specialization: 'surgeon',
        },
        {
          id: '4444',
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

  describe('delete patient resolution', () => {
    it('success resolution delete', async () => {
      MockResolutionService.deleteResolution.mockImplementation(
        async (resolutionID: string): Promise<string> => {
          expect(resolutionID).toEqual('1111');
          return resolutionID;
        },
      );

      expect(await resolutionController.deleteResolution('1111')).toEqual(
        '1111',
      );
    });
  });
});
