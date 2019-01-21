#!/usr/bin/env node
import * as program from 'commander';

interface CommandStructure {
    name: string;
    filePath: string;
    desc: string;
    usage: string;
    alias?: string;
    options?: {
        flags: string;
        desc: string;
        defaultValue?: any;
    }[];
}

const commands: CommandStructure[] = require('./commands');

program.version(require('../package').version)
    .usage('<command> [options]');

for (const command of commands) {
    const cmd = program.command(command.name)
        .description(command.desc)
        .usage(command.usage);
    if (command.alias) {
        cmd.alias(command.alias);
    }
    if (command.options) {
        for (const option of command.options) {
            if (option.defaultValue) {
                cmd.option(option.flags, option.desc, option.defaultValue);
            } else {
                cmd.option(option.flags, option.desc);
            }
        }
    }
    const {action} = require(command.filePath);
    cmd.action(action);
}

program.parse(process.argv);
