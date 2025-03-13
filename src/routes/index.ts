import { Router } from "express";
import { ProductRoutes } from "../App/Modules/Product/product.routes";
import { AuthRoutes } from "../App/Modules/Auth/auth.routes";
import { UserRoutes } from "../App/Modules/User/user.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
