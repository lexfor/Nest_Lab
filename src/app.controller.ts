import {
  Controller,
  Get,
  Dependencies,
  Redirect,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@Dependencies(AppService)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/patient-login', HttpStatus.MOVED_PERMANENTLY)
  main() {}
}
