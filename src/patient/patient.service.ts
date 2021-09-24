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
    return this.repository.createPatient(patient);
  }
}
