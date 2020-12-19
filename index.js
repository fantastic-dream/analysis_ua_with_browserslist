const fs = require('fs');
const path = require('path');
const get = require('lodash/get');
const csvtojson = require('csvtojson');

const plugins = require('./plugins');
const { print, printSuccess, successText } = require('./logger');
const {
  startAnalysis,
  analysisFileExtError,
  title: localeTitle,
  analysisEndTip,
} = require('./logStr');

const defaultOpts = {
  file: `analysis.csv`,
  key: `useragent`,
  rootPath: process.cwd(),
};

module.exports = analysis;

async function analysis(userOptions) {
  print(startAnalysis);

  const opts = {
    ...defaultOpts,
    ...userOptions,
  };

  const { key, file } = opts;
  const fileExtName = path.extname(file);
  const fileData = await getAnalysisFileData(fileExtName, opts);
  const extractUseragentData = fileData
    .map((c) => get(c, key, ''))
    .filter(Boolean);

  const renderMessageData = plugins.map(
    async (plugin) => await plugin.process(extractUseragentData, opts)
  );

  const messages = await Promise.all(renderMessageData);
  messages.map(generatorLogger);
  printSuccess(analysisEndTip);
}

function generatorLogger(message) {
  const { title, content } = message;
  console.log();
  console.log(successText(`${localeTitle}: ${title}`));
  console.log(successText(content));
  console.log();
}

async function getAnalysisFileData(fileExtName, opts) {
  const { rootPath, file } = opts;
  const filePath = path.resolve(rootPath, file);
  let fileData = null;
  if (fileExtName === '.json') {
    fileData = JSON.parse(fs.readFileSync(filePath));
  } else if (fileExtName === '.csv') {
    fileData = await csvtojson().fromFile(filePath);
  } else if (fileExtName === '.js') {
    fileData = require(filePath);
  } else {
    throw new Error(analysisFileExtError);
  }
  return fileData;
}
