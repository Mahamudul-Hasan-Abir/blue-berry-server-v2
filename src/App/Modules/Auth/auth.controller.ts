import catchAsync from "../../../utils/catchAsync";
import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.createUserIntoDB(userData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res): Promise<void> => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: result.accessToken,
    data: result.restData,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
