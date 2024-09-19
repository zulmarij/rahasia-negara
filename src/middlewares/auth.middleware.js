const passport = require('passport');
const httpStatus = require('http-status');
const { apiError } = require('../utils');

const verifyCallback = (req, resolve, reject, roles) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new apiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (roles.length) {
    const hasRoles = user.roles.some((role) => roles.includes(role.name));
    if (!hasRoles && req.params.userId !== user.id) {
      return reject(new apiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const authMiddleware =
  (...roles) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, roles))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = authMiddleware;
