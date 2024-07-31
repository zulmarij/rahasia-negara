const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const ApiSuccess = require('../utils/ApiSuccess');

const createUser = catchAsync(async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = await userService.createUser(email, password, name, role);
  new ApiSuccess(res, user, 'User created successfully', httpStatus.CREATED);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  new ApiSuccess(res, result, 'Users retrieved successfully');
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  new ApiSuccess(res, user, 'User retrieved successfully');
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  new ApiSuccess(res, user, 'User updated successfully');
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  new ApiSuccess(res, null, 'User deleted successfully', httpStatus.NO_CONTENT);
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
