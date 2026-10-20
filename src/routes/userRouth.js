import express from "express";
import {
  fetchUsersController,
  updateUserController,
} from "../controllers/userController.js";

import {
  adminProtected,
  authenticateToken,
} from "../utils/createAccessToken.js";
import { updateUserValidationMiddleware } from "../middleware/validateUserMiddleware.js";

const router = express.Router();

router.get("/all", authenticateToken, adminProtected, fetchUsersController);

router.put(
  "/:id",
  authenticateToken,
  adminProtected,
  updateUserValidationMiddleware,
  updateUserController,
);
export default router;
