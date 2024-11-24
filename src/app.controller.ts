import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipInterceptor } from './common/interceptors/skip-interceptor.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SkipInterceptor()
  getHello(): string {
    return this.appService.getHello();
  }
}
