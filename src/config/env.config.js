const dotenv = require('dotenv');
const Joi = require('joi');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required().description('Database URL'),
    JWT_SECRET: Joi.string().required().description('JWT secret key')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: {
    url: envVars.DATABASE_URL
  },
  jwt: {
    secret: envVars.JWT_SECRET
  }
};
