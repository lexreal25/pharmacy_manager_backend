import Joi from "joi";
import type { InventoryData } from "../types/inventory.types.js";

const inventoryValidationSchema = Joi.object({
  productId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "Invalid product ID",
      "string.length": "Product ID must be a valid MongoDB ID",
      "any.required": "Product ID is required",
    }),

  quantity: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.min": "Quantity cannot be negative",
      "any.required": "Quantity is required",
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),

  expiryDate: Joi.date().required(),

  description: Joi.string().trim().required(),

  supplier: Joi.string().trim().required(),
});

export const validateInventory = (data: InventoryData) =>
  inventoryValidationSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });