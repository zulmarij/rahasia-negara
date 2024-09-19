const express = require('express');
const { versionMiddleware, authMiddleware } = require('../../middlewares');
const { getExamplesHandlers } = require('./get-examples');
const { roleUser } = require('../../constants/enums.constant');

const examplesRoutes = express.Router({ mergeParams: true });

// get examples
examplesRoutes.get(
  '/',
  versionMiddleware(1),
  authMiddleware(roleUser.CUSTOMER),
  getExamplesHandlers.V1
);

module.exports = examplesRoutes;
