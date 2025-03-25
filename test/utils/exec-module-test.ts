import { Arguments } from 'yargs';
import { Test } from '@nestjs/testing';
import { CommandModule } from '../../lib/command.module';
import { CommandModuleTest } from '../../lib/command.module-test';

export const execModuleTest = async (
  module: any,
  command: string,
  args: Partial<Arguments>,
) => {
  const app = await Test.createTestingModule({
    imports: [module],
  }).compile()

  await app.init()

  const moduleTest = new CommandModuleTest(app.select(CommandModule))
  const result = await moduleTest.execute(command, args)

  await app.close()

  return result
}
