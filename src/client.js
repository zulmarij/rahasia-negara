const { PrismaClient } = require('@prisma/client');
const config = require('./config/config');

const prisma = global.prisma || new PrismaClient();

if (config.env === 'development') global.prisma = prisma;

module.exports = prisma;
