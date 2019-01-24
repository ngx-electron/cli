#!/usr/bin/env node
import * as program from 'commander';

interface CommandStructure {
    name: string;
    $impl: string;
    desc: string;
    usage: string;
    alias?: string;
    options?: {
        flags: string;
        desc: string;
        defaultValue?: any;
    }[];
}

const commandMap = require('../commands');

program.version(require('../package').version)
    .usage('<command> [options]');

for (const key of Object.keys(commandMap)) {
    const command: CommandStructure = require(`.${commandMap[key]}`);
    const cmd = program.command(key)
        .description(command.desc)
        .usage(command.usage);
    if (command.alias) {
        cmd.alias(command.alias);
    }
    if (command.options) {
        for (const option of command.options) {
            if (option.defaultValue !== undefined) {
                cmd.option(option.flags, option.desc, option.defaultValue);
            } else {
                cmd.option(option.flags, option.desc);
            }
        }
    }
    const {action, exit} = require(`../commands/${command.$impl}`);
    cmd.action(action);
    if (exit) {
        process.on('exit', exit);
    }
}

program.parse(process.argv);
