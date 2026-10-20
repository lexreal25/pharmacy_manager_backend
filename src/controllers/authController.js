import {
  loginUserService,
  registerUserService,
} from "../services/authService.js";
import { env } from "../config/env.js";






export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("email and password are required");
    }
    const { token, user } = await loginUserService(email, password);

    res.cookie("access_token",token,{
      httpOnly:true,
      secure:env.NODE_ENV === 'production',
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
      path: "/",
    } )

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user,
    });

  } catch (error) {
    next(error);
  }
};


export const logoutUser = (req,res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};