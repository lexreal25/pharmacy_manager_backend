import {
  comparePassword,
  encryptPassword,
} from "../middleware/passwordEncryption.js";
import User from "../models/userModel.js";
import { createAccessToken } from "../utils/creteAccessToken.js";

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
  const hashedPassword = await encryptPassword(password);

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

export const loginUserService = async (username, password) => {
  //Check user
  const user = await User.findOne(username);
  if (!user) {
    throw new Error("Invalid username or password");
  }

  //compare password
  if (!comparePassword(password, user.password)) {
    throw new Error("Invalid username or password");
  }
  //create access token and refresh
  const accessToken = createAccessToken({ id: user._id, role: user.role });
  const { password: psw, ...userData } = user.toObject();

  return {
    token: accessToken,
    user: userData,
  };
};

export const logoutUserService = async (session) => {
  return new Promise((resolve, reject) => {
    session.destroy((err) => {
      if (err) {
        reject(new Error("Logout failed"));
      }
    });
    resolve();
  });
};
