import express from "express";
import {
  fetchUsersController,
  updateUserController,
} from "../controllers/userController.js";

import { userValidatonMiddleware } from "../middleware/validateUserMiddleware.js";
import { adminProtected, authenticateToken } from "../utils/createAccessToken.js";

const router = express.Router();

router.get("/all",adminProtected, fetchUsersController);
router.put("/:id", authenticateToken, adminProtected, userValidatonMiddleware, updateUserController);
export default router;
