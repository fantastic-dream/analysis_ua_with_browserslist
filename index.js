const csvtojson = require('csvtojson');
const path = require('path');
const fs = require('fs');
const get = require('lodash/get');
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
};

module.exports = analysis;

async function analysis(opts) {
  print(startAnalysis);
  const Options = {
    ...defaultOpts,
    ...opts,
  };
  const { key, file } = Options;
  const fileExtName = path.extname(file);
  const filePath = path.resolve(process.cwd(), file);

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

  const extractUseragentData = fileData
    .map((c) => get(c, key, ''))
    .filter(Boolean);

  const renderMessageData = plugins.map(
    async (plugin) =>
      await plugin.process(extractUseragentData, {
        root: process.env(),
      })
  );

  const messages = await Promise.all(renderMessageData);
  messages.map((message) => {
    const { title, content } = message;
    console.log();
    console.log(successText(`${localeTitle}: ${title}`));
    console.log(successText(content));
    console.log();
  });

  printSuccess(analysisEndTip);
}
