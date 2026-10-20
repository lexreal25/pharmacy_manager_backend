import Joi from "joi";
import type { ProductData } from "../types/product.types.js";

const productValidationSchema = Joi.object({
  item: Joi.string().required().trim(),
  description: Joi.string().optional().trim(),
  manufacturer: Joi.string().required().trim(),
  category: Joi.string().required().trim(),
  weight: Joi.number().required(),
});

export const validateProduct = (product: ProductData) => {
  const { error, value } = productValidationSchema.validate(product);
  if (error) {
    throw new Error(
      `Validation error:${error.details.map((detail) => detail.message).join(", ")}`,
    );
  }
  return value;
};
