import { Doctor } from './doctor.interface';

export interface DoctorRepository {
  findPDoctorByUserID: (userID: string) => Promise<Doctor>;
}
