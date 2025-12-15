import express from "express";
import { inventoryController } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/inventory",inventoryController);

export default router;