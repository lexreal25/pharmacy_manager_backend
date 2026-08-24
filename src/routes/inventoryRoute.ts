import express from "express";
import {
  createInventoryController,
  deleteInventoryController,
  getInventoryController,
} from "../controllers/inventoryController.js";
import { updateSalesController } from "../controllers/salesController.js";
import {
  adminProtected,
  authenticateToken,
  userProtected,
} from "../utils/createAccessToken.js";
import { inventoryValidationMiddleware } from "../middleware/inventoryValidationMiddleware.js";

const router = express.Router();

router.get(
  "/:id",
  authenticateToken,
  userProtected,
  adminProtected,
  getInventoryController,
);
router.post(
  "/",
  authenticateToken,
  adminProtected,
  inventoryValidationMiddleware,
  createInventoryController,
);
router.put(
  "/:id",
  authenticateToken,
  adminProtected,
  inventoryValidationMiddleware,
  updateSalesController,
);
router.delete(
  "/:id",
  authenticateToken,
  adminProtected,
  deleteInventoryController,
);

export default router;
