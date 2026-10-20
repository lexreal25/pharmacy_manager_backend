import express from "express";
import {
  adminProtected,
  authenticateToken,
} from "../utils/createAccessToken.js";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  updateProductController,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/all", authenticateToken, adminProtected, getAllProductsController);

router.post(
  "/addProduct",
  authenticateToken,
  adminProtected,
  createProductController,
);
router.put("/:id", authenticateToken, adminProtected, updateProductController);

router.delete(
  "/:id",
  authenticateToken,
  adminProtected,
  deleteProductController,
);

export default router;
