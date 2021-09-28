import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { JwtGuard } from '../helpers/guards/jwt.guard';
import { Patient } from './interfaces/patient.interface';

@Controller('api/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(JwtGuard)
  @Get('all')
  async findPatient(
    @Query('patientInfo') patientInfo: string,
  ): Promise<Patient[]> {
    return await this.patientService.getAllPatients(patientInfo);
  }
}
