import { Doctor } from './doctor.interface';
import { Specialization } from './specialization.interface';

export interface DoctorRepository {
  findPDoctorByUserID: (userID: string) => Promise<Doctor>;
  getAllSpecializations: () => Promise<Specialization[]>;
  getDoctorsBySpecializations: (specializationID: string) => Promise<Doctor[]>;
}
