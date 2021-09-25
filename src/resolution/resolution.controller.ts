import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { ResolutionService } from './resolution.service';
import { userID } from '../doctor/decorators/user-id.decarator';
import { Resolution } from './interfaces/resolution.interface';
import { JwtGuard } from '../helpers/guards/jwt.guard';
import { ResolutionValueDto } from './dto/resolution-value.dto';
import { PatientService } from '../patient/patient.service';
import { DoctorService } from '../doctor/doctor.service';
import { Doctor } from '../doctor/interfaces/doctor.interface';
import { Patient } from '../patient/interfaces/patient.interface';
import { CreateResolutionDto } from './dto/create-resolution.dto';

@Controller('api/resolution')
export class ResolutionController {
  constructor(
    private readonly resolutionService: ResolutionService,
    @Inject(PatientService) private readonly patientService: PatientService,
    @Inject(DoctorService) private readonly doctorService: DoctorService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('patient/:id')
  async addResolution(
    @Body(ValidationPipe) resolutionValueDto: ResolutionValueDto,
    @userID() userID: string,
    @Param('id') id: string,
  ): Promise<Resolution> {
    const doctor: Doctor = await this.doctorService.findDoctorByUserID(userID);
    const patient: Patient = await this.patientService.getPatientByUserID(id);
    const createResolutionDto: CreateResolutionDto = {
      value: resolutionValueDto.value,
      patient_id: patient.id,
      doctor_name: doctor.first_name,
      doctor_specialization: doctor.name,
    };
    return await this.resolutionService.create(createResolutionDto);
  }

  @UseGuards(JwtGuard)
  @Get('patient/me')
  async getAllMyResolutions(@userID() userID: string): Promise<Resolution[]> {
    const patient: Patient = await this.patientService.getPatientByUserID(
      userID,
    );
    return await this.resolutionService.getAllResolutions(patient.id);
  }

  @UseGuards(JwtGuard)
  @Get('patient/:id')
  async getAllResolutions(@Param('id') id: string): Promise<Resolution[]> {
    const patient: Patient = await this.patientService.getPatientByUserID(id);
    return await this.resolutionService.getAllResolutions(patient.id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteResolution(@Param('id') id: string): Promise<string> {
    return await this.resolutionService.deleteResolution(id);
  }
}
