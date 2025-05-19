import AppError from "../../Errors/AppError";
import { TProduct, TReview } from "./product.interface";
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

import { User } from "../User/user.model";

const addReviewToProduct = async (
  productId: string,
  userId: string,
  reviewData: { rating: 1 | 2 | 3 | 4 | 5; comment: string }
) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const newReview = {
    userId: user._id,
    userName: user.name,
    userImage: user.profileImage,
    rating: reviewData.rating,
    comment: reviewData.comment,
  };

  product.reviews.push(newReview as TReview);

  const ratingSum = product.reviews.reduce((sum, r) => sum + r.rating, 0);
  const avg = ratingSum / product.reviews.length;

  // Round to nearest integer (4.4 -> 4, 4.5 -> 5)
  product.totalRating = Math.round(avg);

  await product.save();

  return product;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateSingleProductFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  addReviewToProduct,
};
