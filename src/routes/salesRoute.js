import express from "express";
import { salesController } from "../controllers/salesController.js";

const router = express.Router();

//Sales route

router.get("/sales", salesController);

export default router;