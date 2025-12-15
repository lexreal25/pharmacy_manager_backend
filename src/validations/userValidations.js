import Joi from "joi";

const userValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({tlds:{allow:["com","net"]}})
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  role: Joi.string().validate("admin", "staff", "manager"),
  username: Joi.string().alphanum().min(3).max(10).required(),
  password: Joi.string()
  .min(6)
  .max(15)
  .pattern(/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/) // allow common special chars
  .required(),
});

export const validatedUser = (data) => userValidationSchema.validate(data);  