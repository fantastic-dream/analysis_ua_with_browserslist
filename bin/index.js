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

process.on('uncaughtException', (e) => {
  print('\nerror: \n');
  printError(`message: ${e.message}\n`);
  printError(`stack:
${e && e.stack}`);
  process.exit(1);
});

// version
commander.version(pkg.version);

// main
commander
  .command('analysis')
  .option('-f, --file <filename>', 'select a file path or file name')
  .option('-k, --key <selectKeyPath>', 'set useragent select key path')
  .action(main);

commander.option('-h, --help').action(() => print(helperText));

commander.command('help').action(() => print(helperText));

commander.parse(process.argv);
