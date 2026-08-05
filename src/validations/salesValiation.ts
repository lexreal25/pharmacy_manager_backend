import Joi from "joi";
import type { SalesData } from "../types/sales.types.js";

const salesValidationSchema = Joi.object({
  productId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "Invalid product Id",
      "any.required": "Product id is required",
    }),
  quantity: Joi.number().integer().positive().required(),
  price: Joi.number().positive().precision(2).required(),
  discount: Joi.number().min(0).precision(2).default(0),
  tax: Joi.number().min(0).max(1).required(),
  salesDate: Joi.date().required(),
  customerName: Joi.string().trim().min(3).max(25),
});

export const validateSales = (data:SalesData) => salesValidationSchema.validate(data);
