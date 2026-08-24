import { validateSales } from "../validations/salesValiation.js";
import type { Request, Response, NextFunction } from "express";


export const salesValidationMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const { error } = validateSales(req.body);
    if (error){
        return res.status(400).json({
            message: "Invalid sales data",
            details: error.details?.[0]?.message ?? 'Invalid sales payload'
        })
    }
   return next();
}

