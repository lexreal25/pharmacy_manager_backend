import express from "express";
import { salesController } from "../controllers/salesController.js";
import { salesValidationMiddleware } from "../middleware/validateSalesMiddleware.js";


const router = express.Router();

//Sales route

router.get("/sales", salesController);
router.post("/sales", salesValidationMiddleware, salesController);

export default router;