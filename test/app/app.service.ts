import { Injectable } from '@nestjs/common';
import { Command } from '../../lib/command.decorator';

@Injectable()
export class AppService {
  @Command({
    command: 'add',
    describe: 'add',
  })
  async add() {
    return new Promise<string>((resolve) => setTimeout(() => resolve('add'), 0))
  }
}
