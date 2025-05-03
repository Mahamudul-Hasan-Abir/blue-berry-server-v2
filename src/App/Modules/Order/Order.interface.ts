import { ObjectId } from "mongoose";

export interface IOrderProduct {
  product: ObjectId;
  quantity: number;
}

export interface TOrder {
  user: ObjectId;
  products: IOrderProduct[];
  totalPrice: number;
  status: "pending" | "completed" | "canceled";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TOrderModel extends TOrder {
  _id: ObjectId;
}
