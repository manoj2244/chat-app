import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utilities/error.utility.js'
import catchAsync from '../utilities/aync.utility.js';

export const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AppError('You are not logged in. Please login.', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError('User no longer exists.', 401));
  }

  req.userId = user._id; // ✅ Global access in all routes after this
  next();
});
