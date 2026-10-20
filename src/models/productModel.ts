import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    manufacturer: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      trim: true,
      required: true,
    },
    weight:{
      type:Number,
      trim: true,
      required:true
    }

  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
