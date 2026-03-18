import { validateSales } from "../validations/salesValiation";

export const salesValidationMiddleware = (req, res, next) => {
    const { error } = validateSales(req.body);
    if (error){
        return res.status(400).json({
            message: "Invalid sales data",
            details: error.details[0].message
        })
    }
    next();
}