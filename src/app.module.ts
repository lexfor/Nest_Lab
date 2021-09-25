import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './helpers/database/database.module';
import { QueueModule } from './queue/queue.module';
import { ResolutionModule } from './resolution/resolution.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    QueueModule,
    ResolutionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
