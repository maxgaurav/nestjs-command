import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @Command({
    command: 'echo',
    describe: 'dddddddddddd',
  })
  async echo() {
    await new Promise((resolve) => setTimeout(resolve, 10))
    console.log(this.getHello())
  }
}
