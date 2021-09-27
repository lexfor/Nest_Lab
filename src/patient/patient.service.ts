import { Inject, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientRepository } from './interfaces/repository.interface';
import { Patient } from './interfaces/patient.interface';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class PatientService {
  constructor(
    @Inject('PATIENT_REPOSITORY')
    private readonly repository: PatientRepository,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient: Patient = {
      id: uuidv1(),
      ...createPatientDto,
    };
    return await this.repository.createPatient(patient);
  }

  async getPatientByUserID(userID: string): Promise<Patient> {
    return await this.repository.findPatientByUserID(userID);
  }

  async getAllPatients(patientInfo: string): Promise<Patient[]> {
    return await this.repository.getAllPatients(patientInfo);
  }

  async getPatientByID(patientID: string): Promise<Patient> {
    return await this.repository.getPatientByID(patientID);
  }
}
