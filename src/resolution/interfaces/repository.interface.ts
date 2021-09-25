import { Resolution } from './resolution.interface';

export interface ResolutionRepository {
  addResolution: (resolution: Resolution) => Promise<Resolution>;
  getAllResolutions: (patientID: string) => Promise<Resolution[]>;
  deleteResolution: (resolutionID: string) => Promise<string>;
}
