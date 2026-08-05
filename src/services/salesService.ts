import Sales from "../models/salesModel.js";
import type { SalesData } from "../types/sales.types.js";
import { calcSales } from "../helper/calculateSales.js";



export const getAllSalesService = () => {
  try {
    const sales = Sales.find();
    return sales;
  } catch (error) {
    throw new Error("Error fetching sales");
  }
};

export const createSalesService = async (
  sales: SalesData,
): Promise<SalesData> => {
  const { totalAmount, subtotal, taxAmount } = calcSales(
    sales.quantity,
    sales.price,
    sales.discount,
    sales.tax,
  );

  const newSales = await Sales.create({
    productId: sales.productId,
    customerName: sales.customerName,
    quantity: sales.quantity,
    price: sales.price,
    tax: taxAmount,
    discount: sales.discount,
    subtotal,
    totalAmount,
  });
  return newSales;
};

const updateSales = () => {};

const deleteSales = () => {};
