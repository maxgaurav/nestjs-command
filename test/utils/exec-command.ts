import { Test, TestingModule } from '@nestjs/testing';
import { CommandModule } from '../../lib/command.module';
import { CommandService } from '../../lib/command.service';

export const execCommand = async (
  module: any,
  args?: string[]
) => {
  const app = await Test.createTestingModule({
    imports: [module],
  }).compile()

  await app.init()

  await app.select(CommandModule).get(CommandService).exec(args)

  await app.close()
}
