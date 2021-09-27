import { Patient } from './patient.interface';

export interface PatientRepository {
  createPatient: (patient: Patient) => Promise<Patient>;
  findPatientByUserID: (userID: string) => Promise<Patient>;
  getAllPatients: (patientInfo: string) => Promise<Patient[]>;
  getPatientByID: (patientID: string) => Promise<Patient>;
}
