import { Doctor } from './doctor.interface';
import { Specialization } from './specialization.interface';

export interface DoctorRepository {
  findDoctorByUserID: (userID: string) => Promise<Doctor>;
  getAllSpecializations: () => Promise<Specialization[]>;
  getDoctorsBySpecialization: (specializationID: string) => Promise<Doctor[]>;
}
