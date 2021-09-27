import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { SQLRepository } from './patient.repository';
import { DatabaseModule } from '../helpers/database/database.module';
import { PatientController } from './patient.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PatientController],
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
