import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
    const result: string = await this.repository.getCurrentInQueue(queueID);
    if (!result) {
      throw new HttpException('No patients in queue', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async takeNextFromQueue(queueID: string): Promise<string> {
    await this.repository.takeNextFromQueue(queueID);
    const result = await this.repository.getCurrentInQueue(queueID);
    if (!result) {
      throw new HttpException('Queue is empty', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async checkIsPatientInQueue(
    queueID: string,
    patientID: string,
  ): Promise<void> {
    const patients: string[] = await this.repository.getAllPatientsFromQueue(
      queueID,
    );
    patients.forEach((item: string) => {
      if (item === patientID) {
        throw new HttpException(
          'Patient already in queue',
          HttpStatus.CONFLICT,
        );
      }
    });
  }
}
