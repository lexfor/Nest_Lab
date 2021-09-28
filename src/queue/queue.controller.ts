import {
  Controller, Dependencies,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { JwtGuard } from '../helpers/guards/jwt.guard';
import { userID } from '../helpers/decorators/user-id.decarator';
import { PatientService } from '../patient/patient.service';
import { Patient } from '../patient/interfaces/patient.interface';
import { DoctorService } from '../doctor/doctor.service';
import { Doctor } from '../doctor/interfaces/doctor.interface';

@Controller('api/queue')
@Dependencies(QueueService, PatientService, DoctorService)
export class QueueController {
  constructor(
    private readonly queueService: QueueService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
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
    await this.queueService.checkIsPatientInQueue(id, patient.id);
    return await this.queueService.addPatientInQueue(id, patient.id);
  }

  @UseGuards(JwtGuard)
  @Get('me/current')
  async getCurrentInMyQueue(@userID() userID: string): Promise<Patient> {
    const doctor: Doctor = await this.doctorService.findDoctorByUserID(userID);
    const patientID: string = await this.queueService.getCurrentInQueue(
      doctor.id,
    );
    return await this.patientService.getPatientByID(patientID);
  }

  @UseGuards(JwtGuard)
  @Get(':id/current')
  async getCurrentInQueue(@Param('id') id: string): Promise<Patient> {
    const patientID: string = await this.queueService.getCurrentInQueue(id);
    return await this.patientService.getPatientByID(patientID);
  }

  @UseGuards(JwtGuard)
  @Get('me/next')
  async takeNextInMyQueue(@userID() userID: string): Promise<Patient> {
    const doctor: Doctor = await this.doctorService.findDoctorByUserID(userID);
    const patientID: string = await this.queueService.takeNextFromQueue(
      doctor.id,
    );
    return await this.patientService.getPatientByID(patientID);
  }
}
