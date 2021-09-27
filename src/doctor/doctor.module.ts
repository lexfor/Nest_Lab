import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DatabaseModule } from '../helpers/database/database.module';
import { SQLRepository } from './doctor.repository';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [DoctorController],
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
