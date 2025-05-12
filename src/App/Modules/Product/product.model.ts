import { model, Schema } from "mongoose";
import { TInformation, TProduct, TReview } from "./product.interface";

const reviewSchema = new Schema<TReview>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  userImage: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
});

const informationSchema = new Schema<TInformation>({
  weight: { type: String, required: true },
  dimensions: { type: String, required: true },
  color: { type: [String], required: true },
  brand: { type: String, required: true },
  form_factor: { type: String, required: true },
  quantity: { type: Number, required: true },
  container_type: { type: String, required: true },
  shelf_life: { type: String, required: true },
  ingredients: { type: [String], required: true },
  other_features: { type: String, required: true },
});

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sale_price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock_quantity: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["In Stock", "Out Of Stock"],
      required: true,
    },
    unit: {
      type: [String],
      required: true,
    },
    information: {
      type: informationSchema,
      required: true,
    },
    reviews: {
      type: [reviewSchema],
      default: [],
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model<TProduct>("Product", productSchema);
export default Product;
