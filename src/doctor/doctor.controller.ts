import {
  Controller,
  Dependencies,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { JwtGuard } from '../helpers/guards/jwt.guard';
import { Specialization } from './interfaces/specialization.interface';
import { Doctor } from './interfaces/doctor.interface';

@Controller('api/doctor')
@Dependencies(DoctorService)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @UseGuards(JwtGuard)
  @Get('all/specializations')
  async getAllSpecializations(): Promise<Specialization[]> {
    return await this.doctorService.getAllSpecializations();
  }

  @UseGuards(JwtGuard)
  @Get('specialization/:id')
  async getDoctorsBySpecialization(@Param('id') id: string): Promise<Doctor[]> {
    return await this.doctorService.getDoctorsBySpecialization(id);
  }
}
