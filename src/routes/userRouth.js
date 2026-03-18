import express from "express";
import {
  fetchUsersController,
  updateUserController,
} from "../controllers/userController.js";

import { userValidatonMiddleware } from "../middleware/validateUserMiddleware.js";

const router = express.Router();

router.get("/all", fetchUsersController);
router.put("/:id", userValidatonMiddleware, updateUserController);
export default router;
