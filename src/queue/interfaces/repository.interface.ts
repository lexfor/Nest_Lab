export interface QueueRepository {
  addPatientInQueue: (queueID: string, patientID: string) => Promise<number>;
  getCurrentInQueue: (queueID: string) => Promise<string>;
  takeNextFromQueue: (queueID: string) => Promise<string>;
}
