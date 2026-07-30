import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  SignupSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "@articlehub/shared";
import { authenticate } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../middlewares/async-handler.middleware.js";

const router = Router();
const authController = new AuthController();

router.post(
  "/signup",
  validate(SignupSchema),
  asyncHandler(authController.signup.bind(authController)),
);

router.post(
  "/login",
  validate(LoginSchema),
  asyncHandler(authController.login.bind(authController)),
);

router.post(
  "/refresh-token",
  asyncHandler(authController.refreshToken.bind(authController)),
);

router.get(
  "/profile",
  authenticate,
  asyncHandler(authController.profile.bind(authController)),
);

router.post(
  "/forgot-password",
  validate(ForgotPasswordSchema),
  asyncHandler(authController.forgotPassword.bind(authController)),
);

router.post(
  "/reset-password",
  validate(ResetPasswordSchema),
  asyncHandler(authController.resetPassword.bind(authController)),
);

console.log("✅ Auth routes loaded");

export default router;
