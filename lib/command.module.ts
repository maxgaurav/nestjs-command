import { Module, OnModuleInit } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core';
import { CommandService } from './command.service';
import { CommandExplorerService } from './command-explorer.service';

@Module({
  providers: [CommandService, CommandExplorerService, MetadataScanner],
  exports: [CommandService],
})
export class CommandModule implements OnModuleInit {
  constructor(
    private readonly cliService: CommandService,
    private readonly commandExplorerService: CommandExplorerService
  ) {}

  onModuleInit() {
    this.cliService.initialize(this.commandExplorerService.explore());
  }
}
