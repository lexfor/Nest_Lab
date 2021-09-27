import { Connection } from 'mysql2';
import { createPatientsTable } from '../../initializations/patientTableInit';
import { createResolutionTable } from '../../initializations/resolutionTableInit';

export const initializeTables = async (
  connection: Connection,
): Promise<void> => {
  createPatientsTable(connection);
  createResolutionTable(connection);
};
