import { execCommand } from './utils/exec-command'
import { AppModule } from './app/app.module'

describe('bootstrap', () => {
  it('should exec success', async () => {
    await execCommand(AppModule, ['add'])
  })
})
