import {
  updateUserValidationSchema,
  validatedUser,
} from "../validations/userValidations.js";
// import type { Request, Response, NextFunction } from "express";

export const userValidatonMiddleware = (req, res, next) => {
  //validate the request body
  const { error } = validatedUser(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error?.details?.[0]?.message ?? "Invalid request",
    });
  }
  next();
};

// UPDATE VALIDATION MIDDLEWARE
export const updateUserValidationMiddleware = (req, res, next) => {
  const { error, value } = updateUserValidationSchema(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });
  }

  // Replace req.body with the validated/cleaned data
  req.body = value;

  next();
};
