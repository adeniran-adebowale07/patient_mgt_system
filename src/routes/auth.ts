import { Router } from "express";
import controller from "../controllers/authController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/updatepassword", controller.updatePassword);

export default router;