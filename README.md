# Nestjs Command

## Description

[Extended Package to allow installation in Nestjs 11](https://www.npmjs.com/package/nestjs-command)

[Nest.js](https://github.com/nestjs/nest) Command tools, based on [yargs](https://github.com/yargs/yargs).

## Dependency

- Use version `4.*` for nestjs `10.*`, `11.*`, yargs `16.*`, `17.*`

## BREAKING CHANGES (3.*)
In version `1.0.0` has changes:
- Drop: `autoExit`
- Drop: `CommandService.isRunning`
- Drop: `CommandLogService`
- New: `CommandService.exec()` return Promise (Support async/await)
- `yargs` only support `15.1.*`, `16.*`, `17.*`

## Installation

```bash
$ npm install --save nestjs-command yargs

# if you use typescript
$ npm install --save-dev @types/yargs
```

## Quick Start

Register the command module in your base module: `./src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [CommandModule]
})
export class AppModule {}
```

Create a Cli entrypoint: `./src/cli.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from './app.module';

async function bootstrap () {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false
  });

  try {
    await app
      .select(CommandModule)
      .get(CommandService)
      .exec();
    await app.close()
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
```

And create your command providers (see the example below).

Run your program in either ways:

- `npx nestjs-command`: run by default `./src/cli.ts`
- `CLI_PATH=./dist/cli.js npx nestjs-command`: run `/dist/cli.js` with the `CLI_PATH` env


**Notice**

Make sure to set `CLI_ENV=./dist/cli.js` when using commands in production with pre-compiled typescript


## Usage example

> Note: you will find documentation about yargs `command positional` [here](https://yargs.js.org/docs/#api-reference-positionalkey-opt), and yargs `command options` [here](https://yargs.js.org/docs/#api-reference-optionskey-opt).

Create a simple Command File: `./src/user/user.command.ts`

```typescript
import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserCommand {
  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'create:user <username>',
    describe: 'create a user',
  })
  async create(
    @Positional({
      name: 'username',
      describe: 'the username',
      type: 'string'
    })
    username: string,
    @Option({
      name: 'group',
      describe: 'user group (ex: "jedi")',
      type: 'string',
      alias: 'g',
      required: false
    })
    group: string,
    @Option({
      name: 'saber',
      describe: 'if user has a lightsaber',
      type: 'boolean',
      default: false,
      required: false
    })
    saber: boolean
  ) {
    this.userService.add({
      username,
      group,
      saber
    });
  }
}
```

Create a simple Service File: `./src/user/user.service.ts`

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async add(user: any): Promise<any> {
    return Promise.resolve().then(() => {
      console.log('user added:', user);
    });
  }
}
```

Register this _UserCommand_ and _UserService_ as providers in your base module: `./src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { UserCommand } from './user/user.command';
import { UserService } from './user/user.service';

@Module({
  imports: [CommandModule],
  providers: [UserCommand, UserService]
})
export class AppModule {}
```

And create a cli entrypoint: `./src/cli.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'] // only errors
  });

  try {
    await app
      .select(CommandModule)
      .get(CommandService)
      .exec();
    await app.close()
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}
bootstrap();
```

### Run your program in a terminal

**Get some help**:

```bash
$ npx nestjs-command create:user --help
cli create:user <username>

create a user

Positionals:
  username  the username                                     [string] [required]

Options:
  -h, --help     Show help                                             [boolean]
  --saber        if user has a lightsaber             [boolean] [default: false]
  --group, -g    user group (ex: "jedi")                                [string]
  -v, --version  Show version number                                   [boolean]
```

**Add a new user**:

```bash
$ npx nestjs-command create:user anakin --group jedi --no-saber
user added: { username: 'anakin', group: 'jedi', saber: false }

$ npx nestjs-command create:user yoda --group jedi --saber
user added: { username: 'yoda', group: 'jedi', saber: true }
```

### How to test it?

```typescript
import { Test } from '@nestjs/testing';
import { CommandModule, CommandModuleTest } from 'nestjs-command';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let commandModule: CommandModuleTest;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    commandModule = new CommandModuleTest(app.select(CommandModule));
  });

  it('test command module', async () => {
    const command = 'create:user <username>';
    const args = { username: 'Foo', group: 'Bar', saber: false };

    const user = await commandModule.execute(command, args);
    expect(user.username).toBe('Foo')
    expect(user.group).toBe('Bar')
  });
});
```
