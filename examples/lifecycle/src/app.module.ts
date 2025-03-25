import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CommandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, OnModuleDestroy{
  onModuleInit() {
    console.log('onModuleInit');
  }
  async onModuleDestroy() {
    console.log('onModuleDestroy');
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('onModuleDestroy end');
  }
}
