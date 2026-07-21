import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { SignupSchema } from "../validators/auth.validator.js";

const router = Router();
const authController = new AuthController();

router.post(
  "/signup",
  validate(SignupSchema),
  authController.signup.bind(authController)
);

export default router;