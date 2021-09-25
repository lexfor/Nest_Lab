import { Module } from '@nestjs/common';
import { ResolutionService } from './resolution.service';
import { ResolutionController } from './resolution.controller';
import { SQLRepository } from './resolution.repository';
import { DatabaseModule } from '../helpers/database/database.module';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, PatientModule, DoctorModule, ConfigModule],
  controllers: [ResolutionController],
  providers: [
    {
      provide: 'RESOLUTION_REPOSITORY',
      useClass: SQLRepository,
    },
    ResolutionService,
  ],
  exports: [ResolutionService],
})
export class ResolutionModule {}
