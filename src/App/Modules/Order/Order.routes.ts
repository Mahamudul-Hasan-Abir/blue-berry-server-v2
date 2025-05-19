import { Router } from "express";
import auth from "../../middlewares/auth";
import { User } from "../User/user.model";
import { USER_ROLE } from "../Auth/auth.constant";
import {
  getOrdersByIndividualUser,
  OrderControllers,
} from "./Order.controller";

const router = Router();
router.get("/my-orders", auth(USER_ROLE.user), getOrdersByIndividualUser);
router.post("/add", auth(USER_ROLE.user), OrderControllers.createOrder);
router.delete(
  "/order/:orderId",
  auth(USER_ROLE.user),
  OrderControllers.removeOrder
);
router.get("/get", auth(USER_ROLE.admin), OrderControllers.getAllOrders);
router.patch(
  "/admin/order/:orderId",
  auth(USER_ROLE.admin),
  OrderControllers.updateOrderStatus
);

export const OrderRoutes = router;
