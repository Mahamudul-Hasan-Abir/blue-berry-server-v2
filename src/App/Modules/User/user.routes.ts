import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";

const router = Router();

router.get("/all-users", auth(USER_ROLE.admin), UserController.getAllUsers);
router.get("/:id", UserController.getSingleUser);
router.patch(
  "/update/:userId",
  auth(USER_ROLE.admin),
  UserController.updateProfile
);

export const UserRoutes = router;
