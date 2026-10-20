import type { ProductData } from "../types/product.types.js";
import Product from "../models/productModel.js";
import Inventory from "../models/inventory.js";

export const getAllProductsService = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const createProductsService = async (product: ProductData) => {
  try {
    const ExistingProduct = await Product.findOne({ item: product.item });
    if (ExistingProduct) {
      throw new Error("Product already exists");
    }
    const newProduct = await Product.create(product);
    return newProduct;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

export const updateProductService = async (
  id: string,
  product: Partial<ProductData>,
): Promise<ProductData> => {
  try {
    const existingProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    return existingProduct;
  } catch (error) {
    throw new Error("Failed to update product");
  }
};

export const deletedProductService = async (id: string): Promise<string> => {
  try {
    //check if inventory is linked to the product
    const inventoryExist = await Inventory.exists({ productId: id });
    if (inventoryExist) {
      throw new Error("Cannot delete this product because it has inventory");
    }
    const deleteProduct = await Product.deleteOne({ _id: id });
    if (deleteProduct.deletedCount === 0) {
      throw new Error("Product not found");
    }
    return "Product deleted successfully!";
  } catch (error) {
    if (error instanceof Error && error.message === "Product not found") {
      throw error;
    }

    throw new Error("Failed to delete product");
  }
};
