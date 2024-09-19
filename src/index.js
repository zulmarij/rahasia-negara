const { prisma } = require('./prisma');
const app = require('./app');
const { envConfig, loggerConfig } = require('./config');

let server;
prisma.$connect().then(() => {
  loggerConfig.info('Connected to SQL Database');
  server = app.listen(envConfig.port, () => {
    loggerConfig.info(`Server (${envConfig.env}) running on port ${envConfig.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      loggerConfig.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  loggerConfig.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  loggerConfig.info('SIGTERM signal received');
  if (server) {
    server.close();
  }
});

process.on('SIGINT', () => {
  loggerConfig.info('SIGTERM signal received');
  if (server) {
    server.close();
  }
});
