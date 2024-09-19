const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const httpStatus = require('http-status');
const passport = require('passport');
const { morganConfig, passportConfig } = require('./config');
const routes = require('./routes');
const { errorMiddleware, xssMiddleware } = require('./middlewares');

const app = express();

app.use(morganConfig.successHandler);
app.use(morganConfig.errorHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xssMiddleware());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', passportConfig.jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (envConfig.env === 'production') {
//   app.use('/v1/auth', authLimiterMiddleware);
// }

app.use('/', express.static('public'));

// routes
app.use(routes);

// send back a 404 error for any unknown request
app.use((req, res, next) => {
  next(new apiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorMiddleware.errorConverter);

// handle error
app.use(errorMiddleware.errorHandler);

// fix 'how serialize a BigInt'
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

module.exports = app;
