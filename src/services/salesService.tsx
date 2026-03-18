import { createSalesController } from "../controllers/salesController.js";
import Sales from "../models/salesModel.js";

interface SalesData{
    productId: string;
    customerName: string;
    quantity: number;
    totalAmount: number;
    price: number;
}

export  const createSalesService = async (sales: SalesData) => {
    try {
        const { productId, customerName, quantity, price } = sales;

        const totalAmount = quantity * price;

        const newSales = await Sales.create({
            productId,
            customerName,
            quantity,
            price,
            totalAmount
        })
       return newSales;

    } catch (error) {
        throw new Error("Error creating sales");
    }
}