import { INestApplicationContext } from '@nestjs/common';
import { Arguments, CommandModule } from 'yargs';
import { CommandExplorerService } from './command-explorer.service';

export type FindCommandModule = (
  app: INestApplicationContext,
  command: string
) => Promise<CommandModule>;

const defaultOpts = {
  findCommandModule: ((app, command) => {
    const commandModules = app.get(CommandExplorerService).explore();
    const commandModule = commandModules.find(i => i.command === command);
    if (commandModule === undefined) {
      return Promise.reject(new Error('CommandModule not found'));
    }
    return Promise.resolve(commandModule);
  }) as FindCommandModule
};

export class CommandModuleTest {
  constructor(
    private readonly _app: INestApplicationContext,
    private readonly _opts: { findCommandModule?: FindCommandModule } = {}
  ) {
    this._opts = { ...defaultOpts, ..._opts };
  }

  async execute<Result = any>(
    command: string,
    args: Partial<Arguments>,
  ): Promise<Result> {
    const commandModule = await this._opts.findCommandModule(
      this._app,
      command
    );

    const result = await commandModule.handler({
      _: [],
      $0: command,
      ...args
    });
    return (result as unknown) as Result;
  }
}
