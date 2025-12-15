import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { userValidatonMiddleware } from "../middleware/validateUserMiddleware.js";

const router = express.Router();

router.post("/register", userValidatonMiddleware, registerUser);

router.post("/login", loginUser);

export default router;
