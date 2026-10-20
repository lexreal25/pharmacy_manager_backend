import User from "../models/userModel.js";
import { createAccessToken } from "../utils/createAccessToken.js";

import bcrypt from "bcrypt";

export const registerUserService = async (data) => {
  const { firstName, lastName, email, role, username, password } = data;

  //check if user with username exists
  const usernameExists = await User.findOne({
    username,
  });
  if (usernameExists) {
    throw new Error("Username already exists");
  }

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //create new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    role,
    username,
    password: hashedPassword,
  });

  await newUser.save();

  //Remove password from returned user object
  const { password: pw, ...userData } = newUser._doc;

  return userData;
};

//login user service

export const loginUserService = async (email, password) => {
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = createAccessToken({
    id: user._id,
    role: user.role,
  });

  const { password: psw, ...userData } = user.toObject();

  return {
    token: accessToken,
    user: userData,
  };
};

