#!/usr/bin/env node

const commander = require('commander');
const update = require('update-notifier');

const main = require('../');
const pkg = require('../package.json');
const helperText = require('../helperText');
const { printError, print } = require('../logger');

// update notify
update({
  pkg,
}).notify();

function uncaughtHandler(e) {
  printError('\nerror: \n');
  printError(`message: ${e.message}\n`);
  printError(`stack:
${e && e.stack}`);
  process.exit(1);
}
process.on('uncaughtException', uncaughtHandler);

process.on('unhandledRejection', uncaughtHandler);

// version
commander.version(pkg.version);

// main
commander
  .command('analysis')
  .option('-f, --file <filename>', 'select a file path or file name')
  .option('-k, --key <key>', 'set useragent select key path')
  .option('-r, --root <rootPath>', 'set root Path find your analysis file')
  .action(main);

commander.option('-h, --help').action(() => print(helperText));

commander.command('help').action(() => print(helperText));

commander.parse(process.argv);
