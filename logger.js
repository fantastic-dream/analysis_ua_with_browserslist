const chalk = require('chalk');

const successText = (text) => chalk.green(text);
const warnText = (text) => chalk.yellow(text);
const errorText = (text) => chalk.red(text);
const infoText = (text) => chalk.grey(text);

const print = (text) => process.stdout.write(`${infoText(text)}`);

const printSuccess = (text) => process.stdout.write(`🌈  ${successText(text)}`);

const printError = (text) => process.stdout.write(`💥  ${errorText(text)}`);

const printWarn = (text) => (text) =>
  process.stdout.write(`♘  ${warnText(text)}`);

module.exports = {
  print,
  printSuccess,
  printWarn,
  printError,
  successText,
  warnText,
  infoText,
  errorText,
};
