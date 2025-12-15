import { validatedUser } from "../validations/userValidations.js";

export const userValidatonMiddleware = (req, res, next) => {
  //validate the request body
  const { error } = validatedUser(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};
