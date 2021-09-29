import { Controller, Get, Redirect, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/patient-login', HttpStatus.MOVED_PERMANENTLY)
  main() {}
}
