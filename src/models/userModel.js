import mongoose from "mongoose";
import { encryptPassword } from "../middleware/passwordEncryption.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "staff", "manager"],
      default: "staff",
    },
  },
  {
    timestamps: true,
  }
);

//check if password is modified before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //if password is modified,ecrypt it
  this.password = await encryptPassword(this.password);

  next();
});
const User = mongoose.model("User", userSchema);

export default User;
