import type { Request, Response, NextFunction } from "express";
import {
  createSalesService,
  deletedSalesService,
  getAllSalesService,
  updatedSalesService,
} from "../services/salesService.js";
import type { SalesRequestParams } from "../types/sales.types.js";


export const createSalesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newSales = await createSalesService(req.body);
    return res.status(201).json({
      success: true,
      message: "Sales submitted successfully",
      data: newSales,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSalesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // check if the user is admin / sales agent
    const sales = await getAllSalesService();
    return res.status(200).json({
      success: true,
      message: "Sales retrieved successfully",
      data: sales,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateSalesController = async (
  req: Request<SalesRequestParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedSale = await updatedSalesService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Sales updated successfully",
      data: updatedSale,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSalesController = async (
  req: Request<SalesRequestParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedSales = await deletedSalesService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Sales deleted successfully",
      data: deletedSales,
    });
  } catch (error) {
    next(error);
  }
};
