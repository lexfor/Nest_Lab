import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { JwtGuard } from '../helpers/guards/jwt.guard';

@Controller('api/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(JwtGuard)
  @Get('all')
  async findPatient(@Query('patientInfo') patientInfo: string) {
    return await this.patientService.getAllPatients(patientInfo);
  }
}
