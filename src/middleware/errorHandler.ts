import type { NextFunction, Request, Response } from "express";

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 400;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};
