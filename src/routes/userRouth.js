import express from "express";
import {
  fetchUsersController,
  updateUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/all", fetchUsersController);
router.put("/:id", updateUserController);
export default router;
