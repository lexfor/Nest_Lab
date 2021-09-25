import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from './interfaces/repository.interface';
import { Doctor } from './interfaces/doctor.interface';
import { Specialization } from './interfaces/specialization.interface';

@Injectable()
export class DoctorService {
  constructor(
    @Inject('DOCTOR_REPOSITORY')
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async findDoctorByUserID(userID: string): Promise<Doctor> {
    return await this.doctorRepository.findPDoctorByUserID(userID);
  }

  async getAllSpecializations(): Promise<Specialization[]> {
    return await this.doctorRepository.getAllSpecializations();
  }

  async getDoctorsBySpecialization(
    specializationID: string,
  ): Promise<Doctor[]> {
    return await this.doctorRepository.getDoctorsBySpecializations(
      specializationID,
    );
  }
}
