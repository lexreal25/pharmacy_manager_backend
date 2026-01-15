import {
  loginUserService,
  registerUserService,
  logoutUserService,
} from "../services/authService.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({
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
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    const { token, user } = await loginUserService(username, password);
    res.status(200).json({
      success: true,
      message: "Login successful!",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

//logout user
export const logoutUser = async (req, res, next) => {
  try {
    const session = req.session;
    await logoutUserService(session);
    res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (error) {
    next(error);
  }
};
