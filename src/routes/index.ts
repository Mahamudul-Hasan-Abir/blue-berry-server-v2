import { Router } from "express";
import { ProductRoutes } from "../App/Modules/Product/product.routes";
import { AuthRoutes } from "../App/Modules/Auth/auth.routes";
import { UserRoutes } from "../App/Modules/User/user.routes";
import { CartRoute } from "../App/Modules/Cart/cart.routes";
import { OrderRoutes } from "../App/Modules/Order/Order.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/user-cart",
    route: CartRoute,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
