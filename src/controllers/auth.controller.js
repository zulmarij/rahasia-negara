const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const exclude = require('../utils/exclude');
const ApiSuccess = require('../utils/ApiSuccess');

const register = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.createUser(email, password);
  const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(user);
  new ApiSuccess(
    res,
    { user: userWithoutPassword, tokens },
    'User registered successfully',
    httpStatus.CREATED
  );
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  new ApiSuccess(res, { user, tokens }, 'User logged in successfully');
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  new ApiSuccess(res, null, 'User logged out successfully', httpStatus.NO_CONTENT);
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  new ApiSuccess(res, tokens, 'Tokens refreshed successfully');
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  new ApiSuccess(res, null, 'Reset password email sent successfully', httpStatus.NO_CONTENT);
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  new ApiSuccess(res, null, 'Password reset successfully', httpStatus.NO_CONTENT);
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const user = req.user;
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, verifyEmailToken);
  new ApiSuccess(res, null, 'Verification email sent successfully', httpStatus.NO_CONTENT);
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  new ApiSuccess(res, null, 'Email verified successfully', httpStatus.NO_CONTENT);
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};
