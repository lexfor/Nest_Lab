import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';
import { promisify } from 'util';

@Injectable()
export class RedisRepository {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: RedisClient,
  ) {}

  async addPatientInQueue(queueID: string, patientID: string): Promise<number> {
    const rpushAsync = promisify(this.redisClient.rpush).bind(this.redisClient);
    await rpushAsync(`queueTo${queueID}`, patientID);
    const lrangeAsync = promisify(this.redisClient.lrange).bind(
      this.redisClient,
    );
    const result = await lrangeAsync(`queueTo${queueID}`, 0, -1);
    return result.length;
  }

  async getCurrentInQueue(queueID: string): Promise<string> {
    const lindexAsync = promisify(this.redisClient.lindex).bind(
      this.redisClient,
    );
    return await lindexAsync(`queueTo${queueID}`, 0);
  }

  async takeNextFromQueue(queueID: string): Promise<string> {
    const lpopAsync = promisify(this.redisClient.lpop).bind(this.redisClient);
    await lpopAsync(`queueTo${queueID}`);
    return queueID;
  }
}
