import { Patient } from '../entities/patient.entity';

export interface PatientRepository {
  createPatient: (patient: Patient) => Promise<Patient>;
}
