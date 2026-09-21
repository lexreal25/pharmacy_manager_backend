import {
  loginUserService,
  registerUserService,
  logoutUserService,
} from "../services/authService.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: user,
    });
  } catch (error) {
    next(error.message);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("email and password are required");
    }
    const { token, user } = await loginUserService(email, password);
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user,
      token,
    });
  } catch (error) {
    return next(error.message);
  }
};

//logout user
export const logoutUser = async (req, res, next) => {
  try {
    const session = req.session;
    await logoutUserService(session);
    return res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (error) {
    next(error);
  }
};
