const { PrismaClient } = require('@prisma/client');
const { envConfig } = require('../config');

global.prisma;

const prisma = global.prisma || new PrismaClient();

if (envConfig.env === 'development') global.prisma = prisma;

module.exports = prisma;
