import { Router } from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import upload from "../../middlewares/multerConfig.ts";

const router = Router();

router.get("/", ProductControllers.getAllProducts);
router.get("/:id", ProductControllers.getSingleProduct);

router.post(
  "/",
  auth(USER_ROLE.admin),
  upload.single("image"),
  ProductControllers.addProduct
);
router.post("/:id/review", auth(USER_ROLE.user), ProductControllers.addReview);

router.put("/:id", auth(USER_ROLE.admin), ProductControllers.updateProduct);
router.delete("/:id", auth(USER_ROLE.admin), ProductControllers.deleteProduct);

export const ProductRoutes = router;
