import mongoose, { Schema } from "mongoose";

const salesItemSchema = new mongoose.Schema(
  {
   
    items: {
       inventoryId: {
      type: Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const salesSchema = new mongoose.Schema(
  {
    receiptNubmer: {
      type: String,
      require: true,
      unique: true,
    },
    customer: { type: String, required: true, trim: true },
    items: {
      type: [salesItemSchema],
      required: true,
      validate: (items: unknown[]) => items.length > 0,
      message: "A sales must contain atleast one item",
    },
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    totalamount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Mobile Money"],
      required: true,
    },
    user: { type: String, ref: "User", required: true },
  },
  { timestamps: true },
);

const Sales = mongoose.model("Sales", salesSchema);

export default Sales;
