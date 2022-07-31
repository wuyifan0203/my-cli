#! /usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import {createProject} from '../src/create.js'
import { readFile } from '../src/operation.js';

const pakageJson = JSON.parse(readFile('../package.json'));

program
    .name("wyf-cli")
    .usage(`<command> [option]`)
    .version(pakageJson.version);

program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action((projectName, cmd) => {
    createProject(projectName, cmd)
});

program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    console.log(value, keys);
});

program.on("--help", function () {
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "wyf-cli <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

program.parse(process.argv);
