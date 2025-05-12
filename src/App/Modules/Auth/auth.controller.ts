import catchAsync from "../../../utils/catchAsync";
import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  let imageUrl: string | undefined = undefined;

  // If using multer-storage-cloudinary, the file is already uploaded
  if (req.file && (req.file as any).path) {
    imageUrl = (req.file as any).path; // `path` contains the Cloudinary URL
  }

  const userPayload = {
    ...req.body,
    profileImage: imageUrl,
  };

  const result = await AuthServices.createUserIntoDB(userPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered and logged in successfully",
    token: result.accessToken,
    data: result.restData,
  });
});

const loginUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      token: result.accessToken,
      data: result.restData,
    });
  }
);

export const AuthControllers = {
  createUser,
  loginUser,
};
