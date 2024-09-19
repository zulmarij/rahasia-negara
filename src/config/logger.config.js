const winston = require('winston');
require('winston-daily-rotate-file');
const envConfig = require('./env.config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const timezoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta'
  });
};

const loggerConfig = winston.createLogger({
  level: envConfig.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    envConfig.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.timestamp({
      format: timezoned
    }),
    winston.format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: 'activity-%DATE%.log',
      dirname: 'logs/activity',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d'
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: 'error-%DATE%.log',
      dirname: 'logs/error',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d'
    })
  ]
});

module.exports = loggerConfig;
