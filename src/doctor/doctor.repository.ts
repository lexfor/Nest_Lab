import { Dependencies, Injectable } from '@nestjs/common';
import { DatabaseService } from '../helpers/database/database.service';
import { Doctor } from './interfaces/doctor.interface';
import { Specialization } from './interfaces/specialization.interface';

@Injectable()
@Dependencies(DatabaseService)
export class SQLRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findDoctorByUserID(userID: string): Promise<Doctor> {
    const sql = `SELECT doctors.*, specializations.name FROM doctors
                 JOIN doctor_specialization
                 ON doctor_specialization.doctor_id = doctors.id
                 INNER JOIN specializations
                 ON doctor_specialization.specialization_id = specializations.id
                 WHERE user_id = ?`;
    const [doctor] = await this.databaseService.executeQuery(sql, [userID]);
    return doctor;
  }

  async getAllSpecializations(): Promise<Specialization[]> {
    const sql = `SELECT * FROM specializations`;
    return await this.databaseService.executeQuery(sql);
  }

  async getDoctorsBySpecialization(
    specializationID: string,
  ): Promise<Doctor[]> {
    const sql = `SELECT doctors.*, specializations.name FROM doctors
                 JOIN doctor_specialization
                 ON doctor_specialization.doctor_id = doctors.id
                 INNER JOIN specializations
                 ON doctor_specialization.specialization_id = specializations.id
                 WHERE specializations.id = ?`;
    return await this.databaseService.executeQuery(sql, [specializationID]);
  }
}
