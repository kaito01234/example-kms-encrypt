import { Controller, Get, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('decrypt')
  async decryptSelect(@Query('id') id: string): Promise<string> {
    return this.appService.decrypt(Number(id));
  }

  @Get('encrypt')
  async encryptInsert(@Query('plaintext') plaintext: string): Promise<User> {
    return this.appService.encrypt(plaintext);
  }
}
