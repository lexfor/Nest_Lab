import { Dependencies, Injectable } from '@nestjs/common';
import { DatabaseService } from '../helpers/database/database.service';
import { Patient } from './interfaces/patient.interface';

@Injectable()
@Dependencies(DatabaseService)
export class SQLRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createPatient(patient: Patient): Promise<Patient> {
    const sql = `INSERT INTO patients SET ?`;
    await this.databaseService.executeQuery(sql, [patient]);
    return patient;
  }

  async findPatientByUserID(userID: string): Promise<Patient> {
    const sql = `SELECT * FROM patients
    WHERE 
    user_id = ?`;
    const [patient] = await this.databaseService.executeQuery(sql, [userID]);
    return patient;
  }

  async getAllPatients(patientInfo: string): Promise<Patient[]> {
    const sql = `SELECT * FROM patients
    WHERE name LIKE '%${patientInfo}%'
    OR mail LIKE '%${patientInfo}%'`;
    return await this.databaseService.executeQuery(sql);
  }

  async getPatientByID(patientID: string): Promise<Patient> {
    const sql = `SELECT * FROM patients
    WHERE id = ?`;
    const [result] = await this.databaseService.executeQuery(sql, [patientID]);
    return result;
  }
}
