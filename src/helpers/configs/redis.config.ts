import { ConfigService } from '@nestjs/config';
import { createClient, RedisClient } from 'redis';

export const getRedisClient = (configService: ConfigService): RedisClient => {
  return createClient({
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
  });
};
