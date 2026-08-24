import type { Request, Response, NextFunction } from "express";
import { validateInventory } from "../validations/inventoryValidation.js";


export const inventoryValidationMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const { error } = validateInventory(req.body);
    if (error){
        return res.status(400).json({
            message: "Invalid inventory data",
            details: error.details?.[0]?.message ?? 'Invalid inventory payload'
        })
    }
   return next();
}

