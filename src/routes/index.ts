import { Router } from "express";
import { ProductRoutes } from "../App/Modules/Product/product.routes";
import { AuthRoutes } from "../App/Modules/Auth/auth.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
