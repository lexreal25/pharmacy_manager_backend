import type { Request, Response, NextFunction } from "express";
import {
  createInventoryService,
  deleteInventoryService,
  getAllInventoryService,
  getInventoryByIdService,
  updateInventoryService,
} from "../services/invetoryService.js";

export const createInventoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newInventory = await createInventoryService(req.body);
    return res.status(201).json({
      success: true,
      message: "Inventory created successfully!",
      data: newInventory,
    });
  } catch (error) {
    next(error);
  }
};

export const getInventoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const inventory = await getAllInventoryService();
    return res.status(200).json({
      success: true,
      message: "Inventory fetched successfully!",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

export const getInventoryByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const item = await getInventoryByIdService(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Product retrieved successfully",
      product: item,
    });
  } catch (error) {
    next(error);
  }
};

const updateInventoryController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedInventory = await updateInventoryService(
      req.params.id,
      req.body,
    );
    return res.status(200).json({
      success: true,
      message: "Update successfull",
      updatedProduct: updatedInventory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInventoryController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedInventory = await deleteInventoryService(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Inventory deleted successfully!",
      data: deletedInventory,
    });
  } catch (error) {
    next(error);
  }
};
