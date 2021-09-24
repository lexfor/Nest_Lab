import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Patient } from './interfaces/patient.interface';

@Injectable()
export class SQLRepository {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  async createPatient(patient: Patient): Promise<Patient> {
    const sql = `INSERT INTO patients SET ?`;
    await this.databaseService.executeQuery(sql, [patient]);
    return patient;
  }
}
