const { PrismaClient } = require('@prisma/client');
const { envConfig } = require('./config');

const prisma = global.prisma || new PrismaClient();

if (envConfig.env === 'development') global.prisma = prisma;

module.exports = prisma;
