import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import { redis } from "../lib/redis.js";
import { sendVerificationEmail } from "../mailtrap/mailtrapEmail.js";

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
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 15 minutes
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
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
export const verifyEmail = async (req, res) => {};
export const forgotPassword = async (req, res) => {};
export const resetPassword = async (req, res) => {};
export const google = async (req, res) => {};
