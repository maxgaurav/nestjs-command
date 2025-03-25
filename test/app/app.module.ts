import { Module } from '@nestjs/common';
import { CommandModule } from '../../lib/command.module';
import { AppService } from './app.service';

@Module({
  imports: [CommandModule],
  providers: [AppService]
})
export class AppModule {}
