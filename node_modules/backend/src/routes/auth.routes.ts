import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { SignupSchema } from "../validators/auth.validator.js";
import { LoginSchema } from "../validators/auth.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();
const authController = new AuthController();

router.post(
  "/signup",
  validate(SignupSchema),
  authController.signup.bind(authController)
);

router.post(
  "/login",
  validate(LoginSchema),
  authController.login.bind(authController)
);

router.get(
  "/profile",
  authenticate,
  authController.profile.bind(authController)
)
console.log("✅ Auth routes loaded");
export default router;