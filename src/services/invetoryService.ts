import Inventory from "../models/inventory.js";
import type { InventoryData } from "../types/inventory.types.js";

export const createInventoryService = async (product: InventoryData) => {
  try {
    const { productId, quantity, batchNumber, expiryDate } = product;

    const newInventory = await Inventory.create({
      productId,
      quantity,
      batchNumber,
      expiryDate,
    });
    return newInventory;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

export const getAllInventoryService = async () => {
  try {
    const sales = await Inventory.find()
      .populate("productId")
      .sort({ createdAt: -1 });
    return sales;
  } catch (error) {
    throw new Error("Failed to retrieve data please check and try again!");
  }
};

export const getInventoryByIdService = async (id: string) => {
  try {
    const inventory = Inventory.findById(id).populate("productId");
    if(!inventory){
      throw new Error("No inventory found!")
    }
    return inventory;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Faild to retrieve, please try again");
  }
};

export const updateInventoryService = async (
  id: string,
  inventory: Partial<InventoryData>,
) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(id, inventory, {
      new: true,
      runValidators: true,
    }).populate("productId");

    if (!updatedInventory) {
      throw new Error("Inventory not found");
    }
    return updatedInventory;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to update inventory");
  }
};

export const deleteInventoryService = async(id:string) => {
  try {
    const deleteInventory = await Inventory.findByIdAndDelete(id);
    if(!deleteInventory){
      throw new Error("Inventory not found!");
    }
  } catch (error) {
    if(error instanceof Error)
      throw error;
  }
  throw new Error("Failed to delete inventory")
}