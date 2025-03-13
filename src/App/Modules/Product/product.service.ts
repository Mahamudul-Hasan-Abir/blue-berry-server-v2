import AppError from "../../Errors/AppError";
import { TProduct } from "./product.interface";
import Product from "./product.model";
import httpStatus from "http-status";
const createProductIntoDB = async (payload: TProduct) => {
  const productData = { ...payload };
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find({});
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};

const updateSingleProductFromDB = async (
  id: string,
  payload: Partial<TProduct>
) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "No Product Found");
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    projection: {
      isDeleted: 0,
    },
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "No Product Found");
  }

  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateSingleProductFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
