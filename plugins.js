const browserslist = require('browserslist');
const { matchesUA } = require('browserslist-useragent');

const { plugin1, plugin2 } = require('./logStr');

const renderPlugins = [
  {
    process: async (data, { root }) => {
      const browsersListConfig = browserslist.findConfig(root);
      if (!browsersListConfig || !browsersListConfig.defaults) {
        throw new Error(plugin1.failAnalysisLoadFile);
      }

      const config = browsersListConfig.defaults;
      let success = 0;
      let error = 0;

      data.forEach((dataItem) => {
        if (matchesUA(dataItem, config)) {
          success++;
        } else {
          error++;
        }
      });

      return {
        title: plugin1.resultTitle,
        content: `
${plugin1.count}${success + error}
${plugin1.matchSuccess}${success}
${plugin1.matchErrorCount}${error}
${plugin1.matchSuccessRate}${(success / (success + error)) * 100}%`,
      };
    },
  },

  {
    process: async (data) => {
      const len = data.length;
      let IOS = 0;
      let Android = 0;
      let unknown = 0;
      let example = '';
      for (let i = 0; i < len; i++) {
        if (/(iphone|ipod|ipad)/gi.test(data[i])) {
          IOS++;
        } else if (/(Android).*([\d.]+)/gi.test(data[i])) {
          Android++;
        } else {
          unknown++;
          example = data[i];
        }
      }
      return {
        title: `${plugin2.resultTitle}`,
        content: `
${plugin2.iosDevice}${IOS},
${plugin2.androidDevice}${Android},
${plugin2.unknownDevice}${unknown},
${plugin2.unknownDeviceExample}${example}
				`,
      };
    },
  },
];

module.exports = renderPlugins;
