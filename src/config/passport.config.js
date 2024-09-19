const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const envConfig = require('./env.config');
const { selectedField } = require('../utils');
const { fields } = require('../constants');

const jwtOptions = {
  secretOrKey: envConfig.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify = async (payload, done) => {
  try {
    if (!payload) {
      throw new Error('Invalid token');
    }

    const user = await prisma.$transaction(async (prisma) => {
      const user = await prisma.users.findFirst({
        select: selectedField(fields.user),
        where: { id: payload.id }
      });

      if (user) {
        const roles = await prisma.permissions.findMany({
          where: {
            model_has_permissions: {
              some: {
                users: {
                  id: user.id
                }
              }
            }
          },
          select: selectedField(fields.permission)
        });
        return {
          ...user,
          roles
        };
      }

      return null;
    });

    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy
};
