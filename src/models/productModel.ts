import { string } from "joi";
import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    productName: {
      type: string,
      trim: true,
      required: true,
    },
    description: {
      type: string,
      trim: true,
      default: "",
    },
    purchasePrice: {
      type: Number,
      required: true,
      min: [0, "Purchase price cannot be negative"],
    },

    unitPrice: {
      type: Number,
      required: true,
      min: [0, "Unit price cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
