import express from "express";
import { salesController } from "../controllers/salesController.js";
import { salesValidationMiddleware } from "../middleware/validateSalesMiddleware.js";
import { adminProtected, userProtected } from "../utils/createAccessToken.js";

const router = express.Router();

//Sales route

router.get("/", adminProtected, salesController);

router.get("/:id", userProtected, salesController);

//create sales route
router.post(
  "/",
  userProtected,
  salesValidationMiddleware,
  salesController,
);
router.put(
  "/sales/:id",
  userProtected,
  salesValidationMiddleware,
  salesController,
);

export default router;
