import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './helpers/database/database.module';
import { QueueModule } from './queue/queue.module';
import { ResolutionModule } from './resolution/resolution.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    QueueModule,
    ResolutionModule,
    DoctorModule,
    PatientModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
