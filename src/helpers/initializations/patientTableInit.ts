import { Connection } from 'mysql2';
import { promisify } from 'util';

export const createPatientsTable = async (
  connection: Connection,
): Promise<void> => {
  const queryAsync = promisify(connection.query).bind(connection);
  const sqlQuery = `CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(255),
    name VARCHAR(255),
    birthday VARCHAR(255),
    gender VARCHAR(255),
    mail VARCHAR(255),
    user_id VARCHAR(255),
    PRIMARY KEY (id), 
    FOREIGN KEY (user_id) REFERENCES users(id))`;
  await queryAsync(sqlQuery);
};
