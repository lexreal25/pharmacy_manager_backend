import type { Request, Response, NextFunction } from "express";
import { createSalesService } from "../services/salesService.js";

export const createSalesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newSales = await createSalesService(req.body);
    res.status(201).json({
      success: true,
      message: "Sales submitted successfully",
      data: newSales,
    });
  } catch (error) {
    next(error);
  }
};

// export const getAllSalesController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     // check if the user is admin / sales agent
//     const sales = await getAllSalesService();
//     res.status(200).json({
//       success: true,
//       message: "Sales retrieved successfully",
//       data: sales,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error?.message || "Failed to fetch sales",
//     });
//   }
// };
