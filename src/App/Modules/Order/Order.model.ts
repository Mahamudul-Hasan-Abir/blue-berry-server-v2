import { model, Schema } from "mongoose";
import { TOrderModel } from "./Order.interface";

const orderProductSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
  },
  {
    _id: false, // Good for subdocuments to avoid auto _id generation
  }
);

const orderSchema = new Schema<TOrderModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [orderProductSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cenceled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<TOrderModel>("Order", orderSchema);

export default Order;
