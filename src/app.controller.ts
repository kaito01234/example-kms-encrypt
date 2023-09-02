import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  async decryptSelect(@Param('id') id: string): Promise<string> {
    return this.appService.decrypt(Number(id));
  }

  @Post()
  async encryptInsert(@Body() postData: { plaintext: string }): Promise<User> {
    return this.appService.encrypt(postData.plaintext);
  }
}
