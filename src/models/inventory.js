import { mongoose } from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Product",
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Price can not be genative"],
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Quantity cannot be negative"],
    },
    expiryDate: {
      type: Date,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    supplier: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref:"Supplier",
      required: true,
      trim: true,
    },
    // batchNumber: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//virtual stock level

inventorySchema.virtual("stockStatus").get(function () {
  return this.quantity > 0 ? "In Stock" : "Out of Stock";
});
const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
