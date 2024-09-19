const { catchAsync } = require('../../../utils');
const getExamplesV1 = require('./get-examples.v1');

const V1 = catchAsync(async (req, res) => {
  const examples = await getExamplesV1();
  apiSuccess.send(res, examples);
});

module.exports = {
  V1
};
