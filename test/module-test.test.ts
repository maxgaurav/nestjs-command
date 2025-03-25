import { AppModule } from './app/app.module'
import { execModuleTest } from './utils/exec-module-test'

describe('module-test', () => {
  it('should return result', async () => {
    const result = await execModuleTest(AppModule, 'add', {})
    expect(result).toBe('add')
  })
})
