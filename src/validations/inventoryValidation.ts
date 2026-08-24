import Joi from "joi";
import type { InventoryData } from "../types/inventory.types.js";

const invetoryValidationSchema = Joi.object({
  productId: Joi.string().hex().required().messages({
    "string.hex": "Invalid product Id",
    "any.required": "Product ID is required",
  }),

  quantity: Joi.number().integer().positive().required(),
  batchNumber: Joi.string().required(),
  expireyDate: Joi.date().required(),
});

export const validateInventory = (data: InventoryData) =>
  invetoryValidationSchema.validate(data);
