import { Router } from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";

const router = Router();

router.get("/", ProductControllers.getAllProducts);
router.post("/", auth(USER_ROLE.admin), ProductControllers.addProduct);
router.get("/:id", ProductControllers.getSingleProduct);
router.put("/:id", auth(USER_ROLE.admin), ProductControllers.updateProduct);
router.delete("/:id", auth(USER_ROLE.admin), ProductControllers.deleteProduct);

export const ProductRoutes = router;
