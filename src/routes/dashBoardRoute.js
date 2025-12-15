import express from "express";
import { dashBoardController } from "../controllers/dashBoardController.js";

const router = express.Router();

//Dasboard route

router.get("/dasboard", dashBoardController);

export default router;