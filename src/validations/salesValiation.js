import Joi from "joi";

const salesValidationSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
  totalAmount: Joi.number().positive().required(),
  salesDate: Joi.date().required(),
});

export const validateSales = (data) => salesValidationSchema.validate(data);
