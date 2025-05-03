import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import AppError from "../../Errors/AppError";
import { UserServices } from "./user.service";
import httpStatus from "http-status";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All User Retirived Successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params?.id;
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
  }
  const result = await UserServices.getSingleUserFromDB(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User found successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const userId = req.params?.userId;
  const payload = req.body;
  const result = await UserServices.updateSingleUserFromDB;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: result,
  });
});

const getCart = catchAsync(async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
  }
  const cart = await UserServices.getCart(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart Rertrived",
    data: cart,
  });
});

const addToCart = catchAsync(async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
  }

  const { productId, number } = req.body;
  const updateUser = await UserServices.addToCart(userId, productId, number);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart added successfully",
    data: updateUser,
  });
});

const updateCartItem = catchAsync(async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
  }

  const { productId, number } = req.body;

  const updatedUser = await UserServices.updateCartItem(
    userId,
    productId,
    number
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product removed from cart successfully",
    data: updatedUser.cart,
  });
});

const removeCartItem = catchAsync(async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User id is required");
  }
  const productId = req.params.productId as string;

  const updatedUser = await UserServices.removeCartItem(userId, productId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product removed from cart successfully",
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateProfile,
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
};
