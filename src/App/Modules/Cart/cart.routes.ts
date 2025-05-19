import { Router } from "express";
import { UserController } from "../User/user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";

const router = Router();

router.get("/cart", auth(USER_ROLE.user), UserController.getCart);
router.post("/cart/add", auth(USER_ROLE.user), UserController.addToCart);
router.patch(
  "/cart/update",
  auth(USER_ROLE.user),
  UserController.updateCartItem
);

router.delete(
  "/cart/remove",
  auth(USER_ROLE.user),
  UserController.removeCartItem
);
export const CartRoute = router;
