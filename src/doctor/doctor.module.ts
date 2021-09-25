import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DatabaseModule } from '../database/database.module';
import { SQLRepository } from './doctor.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'DOCTOR_REPOSITORY',
      useClass: SQLRepository,
    },
    DoctorService,
  ],
  exports: [DoctorService],
})
export class DoctorModule {}
