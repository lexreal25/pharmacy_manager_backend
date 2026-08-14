import express from "express";

import {
  adminProtected,
  authenticateToken,
  userProtected,
} from "../utils/createAccessToken.js";
import {
  createSalesController,
  getAllSalesController,
  updateSalesController,
} from "../controllers/salesController.js";

import { salesValidationMiddleware } from "../middleware/salesValidationMiddleware.js";

const router = express.Router();

//Sales route

router.get("/", authenticateToken, adminProtected, getAllSalesController);

router.get("/:id", authenticateToken, userProtected, adminProtected);

//create sales route
router.post(
  "/",
  authenticateToken,
  userProtected,
  adminProtected,
  salesValidationMiddleware,
  createSalesController,
);
router.put(
  "/:id",
  authenticateToken,
  userProtected,
  adminProtected,
  salesValidationMiddleware,
  updateSalesController,
);

router.delete("/:id",authenticateToken, adminProtected);
export default router;
