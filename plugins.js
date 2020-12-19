const browserslist = require('browserslist');
const { matchesUA } = require('browserslist-useragent');

const { plugin1, plugin2 } = require('./logStr');

const renderPlugins = [
  {
    process: async (data, { rootPath }) => {
      const {
        count,
        matchSuccess,
        matchErrorCount,
        matchSuccessRate,
        resultTitle,
      } = plugin1;
      const browsersListConfig = browserslist.findConfig(rootPath);
      if (!browsersListConfig || !browsersListConfig.defaults) {
        throw new Error(plugin1.failAnalysisLoadFile);
      }

      const config = browsersListConfig.defaults;
      let success = 0;
      let error = 0;
      data.forEach((dataItem) =>
        matchesUA(dataItem, { browsers: config }) ? success++ : error++
      );

      return {
        title: resultTitle,
        content: `
${count}${success + error}
${matchSuccess}${success}
${matchErrorCount}${error}
${matchSuccessRate}${(success / (success + error)) * 100}%`,
      };
    },
  },

  {
    process: async (data) => {
      const {
        iosDevice,
        androidDevice,
        unknownDevice,
        unknownDeviceExample,
        resultTitle,
      } = plugin2;
      let IOS = 0;
      let Android = 0;
      let unknown = 0;
      let example = '';
      for (let deviceMessage of data) {
        if (/(iphone|ipod|ipad)/gi.test(deviceMessage)) {
          IOS++;
        } else if (/(Android).*([\d.]+)/gi.test(deviceMessage)) {
          Android++;
        } else {
          unknown++;
          example = deviceMessage;
        }
      }
      return {
        title: `${resultTitle}`,
        content: `
${iosDevice}${IOS},
${androidDevice}${Android},
${unknownDevice}${unknown},
${unknownDeviceExample}${example}
				`,
      };
    },
  },
];

module.exports = renderPlugins;
