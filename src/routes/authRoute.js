import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { userValidatonMiddleware } from "../middleware/validateUserMiddleware.js";
import { testLogin } from "../test/login_test.js";
import {
  adminProtected,
  authenticateToken,
} from "../utils/createAccessToken.js";

const router = express.Router();

router.post(
  "/register",
  authenticateToken,
  adminProtected,
  userValidatonMiddleware,
  registerUser,
);

router.post("/login", loginUser);

router.get("/verifyToken", authenticateToken, (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", logoutUser);

router.post("/test", testLogin);

export default router;
