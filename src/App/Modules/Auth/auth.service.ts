import AppError from "../../Errors/AppError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const createUserIntoDB = async (payload: TUser) => {
  if (!validator.isEmail(payload.email)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email format");
  }
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.CONFLICT, "User already exist");
  }

  const user = await User.create({ ...payload });

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, jwtSecret as string, {
    expiresIn: "30d",
  });

  const { password, ...restData } = user.toObject();

  return {
    accessToken,
    restData,
  };
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Email");
  }
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Password");
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, jwtSecret as string, {
    expiresIn: "30d",
  });

  const { password, ...restData } = user.toObject();

  return {
    accessToken,
    restData,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
