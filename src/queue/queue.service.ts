import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { QueueRepository } from './interfaces/repository.interface';
import { errorMessages } from '../helpers/constants';

@Injectable()
export class QueueService {
  constructor(
    @Inject('QUEUE_REPOSITORY')
    private readonly repository: QueueRepository,
  ) {}

  async addPatientInQueue(queueID: string, patientID: string): Promise<number> {
    await this.repository.addPatientInQueue(queueID, patientID);
    const patients = await this.repository.getAllPatientsFromQueue(queueID);
    return patients.length;
  }

  async getCurrentInQueue(queueID: string): Promise<string> {
    const result: string = await this.repository.getCurrentInQueue(queueID);
    if (!result) {
      throw new HttpException(errorMessages.queueEmpty, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async takeNextFromQueue(queueID: string): Promise<string> {
    await this.repository.takeNextFromQueue(queueID);
    const result = await this.repository.getCurrentInQueue(queueID);
    if (!result) {
      throw new HttpException(errorMessages.queueEmpty, HttpStatus.NOT_FOUND);
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
          errorMessages.alreadyInQueue,
          HttpStatus.CONFLICT,
        );
      }
    });
  }
}
