import { ObjectId, Types } from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  price: number;
  sale_price: number;
  category: string;
  stock_quantity: number;
  sku: string;
  status: "In Stock" | "Out Of Stock";
  unit: string[];
  information: TInformation;
  reviews: TReview[];
  image: string;
  totalRating?: number;
};

export type TReview = {
  userId: Types.ObjectId;
  userName: string;
  userImage?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
};

export type TInformation = {
  weight: string;
  dimensions: string;
  color: string[];
  brand: string;
  form_factor: string;
  quantity: number;
  container_type: string;
  shelf_life: string;
  ingredients: string[];
  other_features: string;
};
