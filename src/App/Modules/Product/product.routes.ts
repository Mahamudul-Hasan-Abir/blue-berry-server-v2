import { Router } from "express";
import { ProductControllers } from "./product.controller";

const router = Router();

router.get("/", ProductControllers.getAllProducts);
router.post("/", ProductControllers.addProduct);
router.get("/:id", ProductControllers.getSingleProduct);
router.put("/:id", ProductControllers.updateProduct);
router.delete("/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
