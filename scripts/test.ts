import execa from 'execa';

const VERSION_NESTJS = [
  6,
  7,
  8,
  9,
  10,
]

const VERSION_YARGS = [
  16,
  17,
]

const run = async () => {
  for (const vNestjs of VERSION_NESTJS) {
    for (const vYargs of VERSION_YARGS) {
      console.log('\n\n\n\n\n')
      console.log(`[Jest]: Custom version "@nestjs/*" = ${vNestjs}`)
      console.log(`[Jest]: Custom version "yargs" = ${vYargs}`)

      await execa.command(`jest`, {
        env: {
          MODULE_NESTJS_VERSION: vNestjs,
          MODULE_YARGS_VERSION: vYargs,
        } as any,
        stdio: 'inherit',
        preferLocal: true,
      })
    }
  }
}

if (require.main === module)
  run()
