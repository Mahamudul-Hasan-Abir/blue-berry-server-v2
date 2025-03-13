import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
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
  const result = await UserServices.getSingleUserFromDB(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User found successfully",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
};
