import { ConfigService } from '@nestjs/config';
import { createClient, RedisClient } from 'redis';

export const getRedisClient = (configService: ConfigService): RedisClient => {
  return createClient({
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_LOCAL_PORT'),
  });
};
