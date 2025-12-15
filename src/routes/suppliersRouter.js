import express  from "express";
import { suppliersController } from "../controllers/suppliersController.js";

const router = express.Router();


router.get("/suppliers", suppliersController);

export default router;