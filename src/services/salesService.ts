import Sales from "../models/salesModel.js";
import type { SalesData } from "../types/sales.types.js";
import { calcSales } from "../helper/calculateSales.js";

export const getAllSalesService = async () => {
  return await Sales.find();
};

export const createSalesService = async (sales: SalesData) => {
  const { totalAmount, subtotal, taxAmount } = calcSales(
    sales.quantity,
    sales.price,
    sales.discount,
    sales.tax_value,
  );

  const newSales = await Sales.create({
    productId: sales.productId,
    customerName: sales.customerName,
    quantity: sales.quantity,
    price: sales.price,
    tax_value: taxAmount,
    discount: sales.discount,
    subtotal,
    totalAmount,
  });
  return newSales;
};

export const updatedSalesService = async (
  id: string,
  sales: Partial<SalesData>,
) => {
  try {
    const existingSales = await Sales.findById(id);
    if (!existingSales) {
      throw new Error("Sales not found");
    }

    const { quantity, price, discount, tax_value, customerName } = sales;

    const { totalAmount, subtotal, taxAmount } = calcSales(
      quantity ?? existingSales.quantity,
      price ?? existingSales.price,
      discount ?? existingSales.discount,
      tax_value ?? existingSales.tax_value,
    );
    return await Sales.findByIdAndUpdate(
      id,
      {
        ...sales,
        quantity,
        price,
        discount,
        tax_value: taxAmount,
        subtotal,
        totalAmount,
        customerName: customerName ?? existingSales.customerName,
      },
      { new: true, runValidators: true },
    );
  } catch (error) {
    throw new Error("Failed to update sales");
  }
};

export const deletedSalesService = async (id: string) => {
  try {
    const deletedSales = await Sales.findByIdAndDelete(id);
    if (!deletedSales) {
      throw new Error("Sales not found");
    }
    return {
      success: true,
      message: " Sales deleted successfully",
      data: deletedSales,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to delete sales");
  }
};
