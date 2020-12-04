const osLocale = require('os-locale');

module.exports =
  osLocale.sync() === 'en-US'
    ? {
        isEnUs: true,
        startAnalysis: 'start Analysis Lol Lol 🚨\n',
        analysisFileExtError: "file ext name need in ['json', 'csv', 'js']",
        title: 'Title',
        analysisEndTip: 'analysis was done!!',
        plugin1: {
          resultTitle: 'analysis adaptor result:',
          count: 'Count: ',
          matchSuccess: 'UA Match Success Count: ',
          matchErrorCount: 'UA Match Error Count: ',
          matchSuccessRate: 'UA Match Success Rate: ',
          failAnalysisLoadFile:
            'Can not parse any browserslist config file !!!',
        },
        plugin2: {
          resultTitle: 'The main Platform distribution:',
          iosDevice: 'IOS device count:',
          androidDevice: 'Android device count:',
          unknownDevice: 'unknown device count:',
          unknownDeviceExample: 'unknown device example:',
        },
      }
    : {
        isEnUs: false,
        startAnalysis: '开始分析啦 嘟嘟嘟 🚨\n',
        analysisFileExtError: '文件后缀名不对劲呀不对劲呀',
        title: '标题',
        analysisEndTip: '分析已经结束！！',
        plugin1: {
          resultTitle: '适配性分析结果：',
          count: '总数：',
          matchSuccess: 'UA 适配成功总数：',
          matchErrorCount: 'UA 适配错误总数：',
          matchSuccessRate: 'UA 匹配成功占比：',
          failAnalysisLoadFile: '未能成功解析 browserslist 配置文件 ！！！',
        },
        plugin2: {
          resultTitle: '主要设备平台分布：',
          iosDevice: 'IOS 设备总数：',
          androidDevice: 'Android 设备总数：',
          unknownDevice: '未知设备总数：',
          unknownDeviceExample: '未知设备示例：',
        },
      };
