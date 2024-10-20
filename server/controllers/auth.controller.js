import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import { redis } from "../lib/redis.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/mailtrapEmail.js";

// create token for verify email
const createVerifyToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// generate jwt tokens
const generateTokens = (user_id) => {
  const refreshToken = jwt.sign({ user_id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  const accessToken = jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  return { accessToken, refreshToken };
};

// store refresh token on redis
const storeRefreshToken = async (user_id, refreshToken, next) => {
  try {
    await redis.set(
      `refresh_token:${user_id}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60
    );
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};

// setCookie
const setCookies = (res, accessToken, refreshToken, next) => {
  try {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return next(errorHandler(400, "All fields are required"));
  try {
    const exitsUser = await User.findOne({ email });
    if (exitsUser) return next(errorHandler(400, "User already exists"));

    const token = createVerifyToken();

    const user = await User.create({
      name,
      email,
      password,
      verificationToken: token,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 01 day
    });

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken, next);
    setCookies(res, accessToken, refreshToken, next);
    await sendVerificationEmail(email, token, next);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};
export const verifyEmail = async (req, res, next) => {
  const { code } = req.body;
  if (!code) return next(errorHandler(400, "Code is required"));

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) return next(errorHandler(400, "Invalid or expired code"));

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name, next);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(errorHandler(400, "All fields are required"));

  try {
    const user = await User.findOne({ email });

    if (!user || (await user.comparePassword(password)) === false)
      return next(errorHandler(400, "Invalid email or password"));

    const { refreshToken, accessToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken, next);
    setCookies(res, accessToken, refreshToken, next);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};
export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decode.user_id}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};
export const forgotPassword = async (req, res) => {};
export const resetPassword = async (req, res) => {};
export const google = async (req, res) => {};
