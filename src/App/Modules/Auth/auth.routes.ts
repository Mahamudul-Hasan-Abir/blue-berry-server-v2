import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import upload from "../../middlewares/multerConfig.ts";

const router = Router();

router.post(
  "/register",
  upload.single("profileImage"),
  AuthControllers.createUser
);
router.post("/login", AuthControllers.loginUser);

export const AuthRoutes = router;
