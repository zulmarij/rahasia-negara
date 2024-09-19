const express = require('express');
const examplesRoutes = require('./examples/examples.routes');
const apiRoutes = express.Router();

apiRoutes.use('/:version/examples', examplesRoutes);

module.exports = apiRoutes;
