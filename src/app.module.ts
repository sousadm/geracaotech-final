import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleLlmService } from './google-llm.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GoogleLlmService],
})
export class AppModule {}
