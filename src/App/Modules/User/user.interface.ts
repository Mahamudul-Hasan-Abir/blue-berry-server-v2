import { Model, Types } from "mongoose";

export type TRole = "admin" | "user";

export type TCartItem = {
  product: Types.ObjectId;
  number: number;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TRole;
  profileImage?: string;
  cart: TCartItem[];
};

export interface TUserModel extends Model<TUser> {
  isUserExist(id: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
