export interface QueueRepository {
  addPatientInQueue: (queueID: string, patientID: string) => Promise<string>;
  getCurrentInQueue: (queueID: string) => Promise<string>;
  takeNextFromQueue: (queueID: string) => Promise<string>;
  getAllPatientsFromQueue: (queueID: string) => Promise<string[]>;
}
