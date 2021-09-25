import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Doctor } from './interfaces/doctor.interface';

@Injectable()
export class SQLRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findDoctorByUserID(userID: string): Promise<Doctor> {
    const sql = `SELECT * FROM doctors
    WHERE 
    user_id = ?`;
    const [doctor] = await this.databaseService.executeQuery(sql, [userID]);
    return doctor;
  }
}
