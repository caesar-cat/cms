'use strict';
const path = require('path')
module.exports = appInfo => {
  return {
     // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1530607570918_8454',
    appRoot: appInfo.root,
    customLogger: {
      scheduleLogger: {
        consoleLevel: 'NONE',
        file: path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
      },
    },
    middleware: ['gzip'],
    gzip: {
      threshold: 1024, // 小于 1k 的响应体不压缩
    },
    mongoose: {
      client: {
        url: 'mongodb://localhost:27017/cms',
        options: {
          reconnectInterval: 500,
          poolSize: 10
        }
      }
    },
    static: {
      prefix: '/',
      dir: path.join(appInfo.baseDir, 'app/public')
    }
  }
};
