import express from "express";
import { customersController } from "../controllers/customersController.js";


const router = express.Router();


router.get("/add-customer", customersController);

export default router;