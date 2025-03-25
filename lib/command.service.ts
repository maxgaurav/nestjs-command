import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Injectable, Global } from '@nestjs/common';
import type { CommandModule } from 'yargs';

@Global()
@Injectable()
export class CommandService {
  initialize(metadatas: CommandModule[]) {
    yargs
      .scriptName('cli')
      .demandCommand(1)
      .help('h')
      .alias('h', 'help')
      .alias('v', 'version')
      .strict();

    metadatas.forEach(command => {
      yargs.command(command);
    });
  }

  exec(args = hideBin(process.argv)) {
    if (
      'parseAsync' in yargs
      && typeof (yargs as any).parseAsync === 'function'
    ) {
      return (yargs as any).parseAsync(args)
    }

    return new Promise<void>((resolve, reject) => {
      try {
        yargs
          .onFinishCommand(resolve)
          .parse(args)
      } catch (error) {
        reject(error)
      }
    })
  }
}
