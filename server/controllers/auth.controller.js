import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import { redis } from "../lib/redis.js";
import {
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/mailtrapEmail.js";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

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
    console.log("inside logout");
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

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return next(errorHandler(401, "No Token Provided"));

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedRefreshToken = await redis.get(
      `refresh_token:${decoded.user_id}`
    );

    if (refreshToken !== storedRefreshToken)
      return next(errorHandler(401, "Invalid Token"));

    const accessToken = jwt.sign(
      { user_id: decoded.user_id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(errorHandler(400, "Email is required"));
  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(400, "User not found"));

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 01 hour
    await user.save();
    await sendResetPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
      next
    );
    res.status(200).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};
export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!token) return next(errorHandler(400, "Token is required"));
    if (!password) return next(errorHandler(400, "Password is required"));

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) return next(errorHandler(400, "Invalid or expired token"));

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await sendResetPasswordSuccessEmail(user.email, next);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  if (!email || !name) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email }); // Corrected findOne syntax

    if (user) {
      const { refreshToken, accessToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken, next);
      setCookies(res, accessToken, refreshToken, next);

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      });
    } else {
      const token = createVerifyToken();
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(randomPassword, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken: token,
        profilePicture: googlePhotoUrl || "",
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      const { accessToken, refreshToken } = generateTokens(newUser._id);
      await storeRefreshToken(newUser._id, refreshToken, next);
      setCookies(res, accessToken, refreshToken, next);
      await sendVerificationEmail(email, token, next);

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isVerified: newUser.isVerified,
      });
    }
  } catch (error) {
    console.log("Error in Google Auth:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return next(errorHandler(404, "User not found"));

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal server error"));
  }
};
