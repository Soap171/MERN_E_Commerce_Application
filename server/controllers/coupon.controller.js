import Coupon from "../models/coupon.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getCoupon = async (req, res, next) => {
  try {
    const coupoon = await Coupon.find({ userId: req.user._id, isActive: true });
    if (!coupoon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json(coupoon);
  } catch (error) {
    console.log("Error in getCoupon", error);
    next(error);
  }
};

export const validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Coupon code is required" });
    }

    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(400).json({ message: "Coupon has expired" });
    }

    res.status(200).json({
      message: "Coupon is valid",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.log("Error in validateCoupon", error);
    next(error);
  }
};
