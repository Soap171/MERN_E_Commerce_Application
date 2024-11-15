import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "Please select at least one image",
      },
      max: [7, "You can only upload a maximum  of 7 images"],
    },

    category: {
      type: String,
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
