import { model, Schema, Types } from "mongoose";
import { TUser, TUserModel } from "./user.interface";
import { role } from "./user.constant";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const CartItemSchema = new Schema({
  product: { type: Types.ObjectId, ref: "Product", required: true },
  number: { type: Number, required: true },
});

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      enum: { values: role },
      message: "{VALUE} is not valid role",
      default: "user",
    },
    profileImage: { type: String, required: false },
    cart: { type: [CartItemSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(process.env.LT_ROUNDS)
//   );
//   next();
// });
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALT_ROUNDS)
  );
  next();
});

// userSchema.statics.isUserExist = async function (id: string) {
//   const existingUser = await User.findOne({
//     _id: id,
//     isDeleted: { $ne: true },
//   });
//   return existingUser;
// };
userSchema.statics.isUserExist = async function (id: string) {
  return User.findOne({ _id: id }, "_id name email role").lean(); // 🔸 Only return needed fields and use lean()
};

// userSchema.statics.isPasswordMatched = async function (
//   plainPassword: string,
//   hashedPassword: string
// ) {
//   return await bcrypt.compare(plainPassword, hashedPassword);
// };
userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, TUserModel>("User", userSchema);
