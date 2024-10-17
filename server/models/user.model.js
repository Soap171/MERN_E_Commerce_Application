import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727136000&semt=ais_hybrid",
    },
    phone: {
      type: String,
      default: "1234567890",
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },

        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
