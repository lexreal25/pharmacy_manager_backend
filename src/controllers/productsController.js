import {
  createProductsService,
  deletedProductService,
  getAllProductsService,
  updateProductService,
} from "../services/productsService.js";
import { validateProduct } from "../validations/productValidation.js";

export const createProductController = async (req, res) => {
  try {
    const validatedProduct = validateProduct(req.body);
    const newProduct = await createProductsService(validatedProduct);
    return res.status(200).json({
      success: true,
      message: "Product added successfully!",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProductsService(req.body);
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const updatedProduct = await updateProductService(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const deletedProduct = await deletedProductService(req.params.id);
    return res.status(200).json({
      success: true,
      message: "product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
