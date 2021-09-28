import { Dependencies, Injectable } from '@nestjs/common';
import { DatabaseService } from '../helpers/database/database.service';
import { Resolution } from './interfaces/resolution.interface';

@Injectable()
@Dependencies(DatabaseService)
export class SQLRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async addResolution(resolution: Resolution): Promise<Resolution> {
    const sql = `INSERT INTO resolutions SET ?`;
    await this.databaseService.executeQuery(sql, [resolution]);
    return resolution;
  }

  async getAllResolutions(patientID: string): Promise<Resolution[]> {
    const sql = `SELECT * FROM resolutions WHERE patient_id = ?`;
    return await this.databaseService.executeQuery(sql, [patientID]);
  }

  async deleteResolution(resolutionID: string): Promise<string> {
    const sql = `DELETE FROM resolutions WHERE id = ?`;
    await this.databaseService.executeQuery(sql, [resolutionID]);
    return resolutionID;
  }
}
