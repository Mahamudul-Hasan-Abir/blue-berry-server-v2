import AppError from "../../Errors/AppError";
import { User } from "./user.model";
import httpStatus from "http-status";

const getAllUsersFromDB = async () => {
  const users = await User.find({});
  return users;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "This user doesn't exist!");
  }
  return user;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
};
