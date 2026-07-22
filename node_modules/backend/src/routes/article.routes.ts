import { Router } from "express";
import { ArticleController } from "../controllers/article.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { CreateArticleSchema } from "@articlehub/shared";

const router = Router();
const articleController = new ArticleController();

router.post(
  "/",
  authenticate,
  validate(CreateArticleSchema),
  articleController.create.bind(articleController)
);

export default router;