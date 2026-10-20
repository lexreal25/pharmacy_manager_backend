import mongoose from "mongoose";
import Sales from "../models/salesModel.js";
import type { SalesData } from "../types/sales.types.js";
import { calcMultiItemSales } from "../helper/calculateSales.js";
import Inventory from "../models/inventory.js";

const roundMoney = (amount: number) =>
  Math.round((amount + Number.EPSILON) * 100) / 100;

//only admin
export const getAllSalesService = async () => {
  try {
    return await Sales.find().sort({ createAt: -1 });
  } catch (error) {
    throw new Error("Failed to retrieve data");
  }
};

//get sales by id
export const getSalesByIdService = async (id: string) => {
  try {
    const sales = await Sales.findById(id);
    if (sales) {
      return sales;
    }
  } catch (error) {
    throw new Error("Data request failed");
  }
};

//get sales by user id
export const getSalesByUserIdService = async (userId: string) => {
  try {
    const sales = await Sales.find({ user: userId })
      .populate("productId")
      .sort({ createAt: -1 });
    if (sales) {
      return sales;
    }
  } catch (error) {
    throw new Error("Data request failed");
  }
};

export const createSalesService = async (sales: SalesData) => {
  if (!sales.customer?.trim()) {
    throw new Error("Customer name is required");
  }
  if (!Array.isArray(sales.items) || sales.items.length === 0) {
    throw new Error("Add at least one item to the sales.");
  }
  if (!mongoose.isValidObjectId(sales.userId)) {
    throw new Error("Invalid user ID.");
  }
  //Prevent duplicate inventory rows in one request.
  const quantities = new Map<string, number>();
  for (const item of sales.items) {
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new Error("Item quantities must be positive whole numbers.");
    }
    quantities.set(
      item.inventoryId,
      (quantities.get(item.inventoryId) ?? 0) + item.quantity,
    );
  }
  const session = await mongoose.startSession();
  try {
    let createdSales: InstanceType<typeof Sales> | undefined;
    await session.withTransaction(async () => {
      const requestedItems = [...quantities.entries()];
      const salesItems = [];

      //Stable order reduces conflicting lock order for concurrent sales.
      requestedItems.sort(([a], [b]) => a.localeCompare(b));

      for (const [inventorId, quantity] of requestedItems) {
        const inventory = await Inventory.findOneAndUpdate(
          {
            _id: inventorId,
            quantity: { $gte: quantity },
          },
          {
            $inc: { quantity: -quantity },
          },
          {
            new: true,
            session,
          },
        );
        if (!inventory) {
          throw new Error(
            `Insufficient stock or inventory not found:${inventorId}`,
          );
        }
        const productId = inventory.productId;
        if (!productId) {
          throw new Error(`Inventory ${inventorId} has no linked product.`);
        }

        salesItems.push({
          inventorId: inventory._id,
          productId,
          item: await getProductName(productId, session),
          quantity,
          price: inventory.price,
          total: roundMoney(quantity * inventory.price),
        });
      }

      const total = calcMultiItemSales(
        salesItems.map((item) => ({
          quantity: item.quantity,
          price: item.price,
        })),
        sales.discount,
      );
      const [saved] = await Sales.create(
        [
          {
            customer: sales.customer.trim(),
            items: salesItems,
            discount: total.discount,
            tax: total.taxAmount,
            total: total.totalAmount,
            paymentMethod: sales.paymentMethod,
            user: sales.userId,
          },
        ],
        { session },
      );
      createdSales = saved;
    });
    if (!createdSales) {
      throw new Error("Sales counld not be created.");
    }
    return createdSales;
  } finally {
    await session.endSession();
  }
};

async function getProductName(
  productId: unknown,
  session: mongoose.ClientSession,
): Promise<string> {
  const Product = mongoose.model("Product");
  const product = await Product.findById(productId).session(session);

  if (!product) {
    throw new Error("Product not found.");
  }

  return product.get("item") as string;
}

export const updatedSalesService = async (
  id: string,
  sales: Partial<SalesData>,
) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid sales ID.");
  }

  const session = await mongoose.startSession();

  try {
    let updatedSale: InstanceType<typeof Sales> | null = null;

    await session.withTransaction(async () => {
      const existingSale = await Sales.findById(id).session(session);

      if (!existingSale) {
        throw new Error("Sale not found.");
      }

      // Keep the existing cart unless a new cart is provided.
      const requestedItems =
        sales.items ??
        existingSale.items.map((item) => ({
          inventoryId: item.inventoryId.toString(),
          quantity: item.quantity,
        }));

      if (!requestedItems.length) {
        throw new Error("A sale must contain at least one item.");
      }

      const discount = sales.discount ?? existingSale.discount;

      // Combine duplicate inventory IDs.
      const quantities = new Map<string, number>();

      for (const item of requestedItems) {
        if (!mongoose.isValidObjectId(item.inventoryId)) {
          throw new Error("Invalid inventory ID.");
        }

        if (!Number.isInteger(item.quantity) || item.quantity < 1) {
          throw new Error("Quantities must be positive whole numbers.");
        }

        quantities.set(
          item.inventoryId,
          (quantities.get(item.inventoryId) ?? 0) + item.quantity,
        );
      }

      const oldQuantities = new Map<string, number>();

      for (const item of existingSale.items) {
        const inventoryId = item.inventoryId.toString();

        oldQuantities.set(
          inventoryId,
          (oldQuantities.get(inventoryId) ?? 0) + item.quantity,
        );
      }

      const inventoryIds = [
        ...new Set([...oldQuantities.keys(), ...quantities.keys()]),
      ].sort();

      const inventoryRecords = new Map<string, any>();

      // Restore previous quantities and reserve the new quantities.
      for (const inventoryId of inventoryIds) {
        const oldQuantity = oldQuantities.get(inventoryId) ?? 0;
        const newQuantity = quantities.get(inventoryId) ?? 0;
        const difference = newQuantity - oldQuantity;

        let inventory;

        if (difference > 0) {
          inventory = await Inventory.findOneAndUpdate(
            {
              _id: inventoryId,
              quantity: { $gte: difference },
            },
            { $inc: { quantity: -difference } },
            { new: true, session },
          );
        } else if (difference < 0) {
          inventory = await Inventory.findByIdAndUpdate(
            inventoryId,
            { $inc: { quantity: -difference } },
            { new: true, session },
          );
        } else {
          inventory = await Inventory.findById(inventoryId).session(session);
        }

        if (!inventory) {
          throw new Error(
            `Inventory unavailable or insufficient stock: ${inventoryId}`,
          );
        }

        inventoryRecords.set(inventoryId, inventory);
      }

      const items = [...quantities.entries()].map(([inventoryId, quantity]) => {
        const inventory = inventoryRecords.get(inventoryId);

        if (!inventory?.productId) {
          throw new Error(`Product missing for inventory ${inventoryId}.`);
        }

        return {
          inventoryId: inventory._id,
          productId: inventory.productId,
          itemname:
            existingSale.items.find(
              (item) => item.inventoryId.toString() === inventoryId,
            )?.items ?? "Product",
          quantity,
          price: inventory.price,
          lineTotal:
            Math.round((quantity * inventory.price + Number.EPSILON) * 100) /
            100,
        };
      });

      const totals = calcMultiItemSales(
        items.map((item) => ({
          quantity: item.quantity,
          price: item.price,
        })),
        discount,
      );

      updatedSale = await Sales.findByIdAndUpdate(
        id,
        {
          items,
          customer: sales.customer ?? existingSale.customer,
          discount: totals.discount,
          subtotal: totals.subtotal,
          tax_value: totals.taxAmount,
          totalAmount: totals.totalAmount,
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
    });

    if (!updatedSale) {
      throw new Error("Sale update failed.");
    }

    return updatedSale;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to update sales.");
  } finally {
    await session.endSession();
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
