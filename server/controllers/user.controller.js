import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import catchAsync from "../utilities/aync.utility.js";
import AppError from "../utilities/error.utility.js";
import { generateToken } from "../utilities/jwtGenerate.utility.js";

export const register = catchAsync(async (req, res, next) => {
  const { fullName, username, password, avatar, gender } = req.body;

  // Check all required fields
  if (!fullName || !username || !password || !gender) {
    return next(new AppError("All fields are required", 400));
  }

  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return next(new AppError("Username already taken", 400));
  }

  // Generate initials
  const nameParts = fullName.trim().split(" ");
  const initials =
    (nameParts[0]?.charAt(0) || "") + (nameParts[1]?.charAt(0) || "");

  const capitalizedInitials = initials.toUpperCase();
  let userAvatar = avatar;
  if (!avatar) {
const darkBackgroundColors = [
  "1e293b", "0f172a", "4b5563",
  "7f1d1d", "1f2937", "3f3f46",
  "1c1917", "0a0a0a"
];
const randomColor = darkBackgroundColors[Math.floor(Math.random() * darkBackgroundColors.length)];

userAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${capitalizedInitials}&backgroundColor=${randomColor}&color=000000`;

  }
  console.log(userAvatar, "dsgsdgdsgsdg");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullName,
    username,
    password: hashedPassword,
    avatar: userAvatar,
    gender,
  });

  await newUser.save();

  const token = generateToken(newUser._id);

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000, 
  };

  res.status(201).cookie("jwt", token, cookieOptions).json({
    status: "success",
    message: "User registered successfully",
    userId: newUser._id,
    data: newUser,
    token
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return next(new AppError("Username and password are required", 400));
  }

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError("Invalid username or password", 401));
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid username or password", 401));
  }

  // Optional: Remove password from response
  user.password = undefined;
   const token = generateToken(user._id);

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000, 
  };

  res.status(200).cookie("jwt", token, cookieOptions).json({
    status: "success",
    message: "Login successful",
    data:user,
    token
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-password"); // exclude password

  if (!users || users.length === 0) {
    return next(new AppError("No users found", 404));
  }

  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

export const getProfile = catchAsync(async (req, res, next) => {
    // req.userId this came from authenticated or after verify token
  const user = await User.findById(req.userId).select('-password');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data:user,
  });
});


// logout 

export const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};


export const getOtherUsers = catchAsync(async (req, res, next) => {
    // req.userId this came from authenticated or after verify token
  const user = await User.find({_id:{$ne:req.userId}})

  if (!user) {
    return next(new AppError('There are not other users yet.', 404));
  }

  res.status(200).json({
    status: 'success',
    data:user,
  });
});
