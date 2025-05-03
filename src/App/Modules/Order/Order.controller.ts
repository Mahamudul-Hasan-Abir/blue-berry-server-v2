import { model } from "mongoose";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import AppError from "../../Errors/AppError";
import { OrderService } from "./Order.service";
import sendResponse from "../../../utils/sendResponse";

const createOrder = catchAsync(async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
  }
  const { products } = req.body;
  const order = await OrderService.createOrder(userId, products);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order created successfully",
    data: order,
  });
});

const removeOrder = catchAsync(async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
  }
  const orderId = req.params.orderId as string;
  const order = await OrderService.removeOrder(
    orderId,
    userId,
    req.user?.role === "admin"
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order removed successfully",
    data: order,
  });
});

const getUserOrders = catchAsync(async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
  }
  const orders = await OrderService.getUserOrders(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully",
    data: orders,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await OrderService.getAllOrders();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All orders fetced successfully",
    data: orders,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const orderId = req.params.orderId as string;
  const { status } = req.body;
  const updateOrder = await OrderService.updateOrderStatus(orderId, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order status updated successfully",
    data: updateOrder,
  });
});

export const OrderControllers = {
  updateOrderStatus,
  getAllOrders,
  getUserOrders,
  removeOrder,
  createOrder,
};
