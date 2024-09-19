const express = require('express');
const apiRoutes = require('./api/api.routes');
const routes = express.Router();

// api routes
routes.use('/api', apiRoutes);

module.exports = routes;
