import express from "express";
import { medicinesController } from "../controllers/medicineController.js";


const router = express.Router();

router.get("/medicines", medicinesController);

export default router;