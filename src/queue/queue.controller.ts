import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { JwtGuard } from '../guards/jwt.guard';
import { userID } from '../decorators/user-id.decarator';
import { PatientService } from '../patient/patient.service';
import { Patient } from '../patient/interfaces/patient.interface';
import { DoctorService } from '../doctor/doctor.service';
import { Doctor } from '../doctor/interfaces/doctor.interface';

@Controller('api/queue')
export class QueueController {
  constructor(
    private readonly queueService: QueueService,
    @Inject(PatientService) private readonly patientService: PatientService,
    @Inject(DoctorService) private readonly doctorService: DoctorService,
  ) {}

  @UseGuards(JwtGuard)
  @Post(':id/patient/me')
  async AddMeInQueue(
    @Param('id') id: string,
    @userID() userID: string,
  ): Promise<number> {
    const patient: Patient = await this.patientService.getPatientByUserID(
      userID,
    );
    return await this.queueService.addPatientInQueue(id, patient.id);
  }

  @UseGuards(JwtGuard)
  @Get('me/current')
  async getCurrentInMyQueue(@userID() userID: string): Promise<string> {
    const doctor: Doctor = await this.doctorService.findDoctorByUserID(userID);
    return await this.queueService.getCurrentInQueue(doctor.id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/current')
  async getCurrentInQueue(@Param('id') id: string): Promise<string> {
    return await this.queueService.getCurrentInQueue(id);
  }

  @UseGuards(JwtGuard)
  @Get('me/next')
  async takeNextInMyQueue(@userID() userID: string): Promise<string> {
    const doctor: Doctor = await this.doctorService.findDoctorByUserID(userID);
    return await this.queueService.takeNextFromQueue(doctor.id);
  }
}
