import express from "express";

const router = express.Router();

router.get("/expenses", expensesController);

export default router;
