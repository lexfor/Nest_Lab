import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { SQLRepository } from './patient.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'PATIENT_REPOSITORY',
      useClass: SQLRepository,
    },
    PatientService,
  ],
  exports: [PatientService],
})
export class PatientModule {}
