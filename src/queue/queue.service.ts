import { Inject, Injectable } from '@nestjs/common';
import { QueueRepository } from './interfaces/repository.interface';

@Injectable()
export class QueueService {
  constructor(
    @Inject('QUEUE_REPOSITORY')
    private readonly repository: QueueRepository,
  ) {}

  async addPatientInQueue(queueID: string, patientID: string): Promise<number> {
    return await this.repository.addPatientInQueue(queueID, patientID);
  }

  async getCurrentInQueue(queueID: string): Promise<string> {
    return await this.repository.getCurrentInQueue(queueID);
  }

  async takeNextFromQueue(queueID: string): Promise<string> {
    await this.repository.takeNextFromQueue(queueID);
    return await this.repository.getCurrentInQueue(queueID);
  }
}
