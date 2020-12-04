const { isEnUs } = require('./logStr');

const helperText = isEnUs
  ? `
Description
  according a file(json/csv), like redash export useragent data

  Usage
  $ uio analysis -f <filename> -k <selectKeyPath>
  $ uio help

  Commands
  analysis            analysis a file get useragent analysis message


  command analysis Options
  -f --filename select a file path
  -k --keyPath select the useragent path in data
`
  : `
简介
  根据文件(json/csv), 像从 redash 导出的数据

  使用
  $ uio analysis -f <filename> -k <selectKeyPath>
  $ uio help

  Commands
  analysis            analysis a file get useragent analysis message


  command analysis Options
  -f --filename select a file path
  -k --keyPath select the useragent path in data
`;

module.exports = helperText;
