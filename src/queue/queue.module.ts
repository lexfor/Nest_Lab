import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { ConfigService } from '@nestjs/config';
import { getRedisClient } from '../configs/redis.config';
import { RedisRepository } from './queue.repository';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [PatientModule, DoctorModule],
  controllers: [QueueController],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      useFactory: getRedisClient,
    },
    {
      provide: 'QUEUE_REPOSITORY',
      useClass: RedisRepository,
    },
    QueueService,
  ],
})
export class QueueModule {}
