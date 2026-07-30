import { Router } from "express";
import { ArticleController } from "../controllers/article.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { CreateArticleSchema, Role } from "@articlehub/shared";
import { authorize } from "../middlewares/authorize.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { asyncHandler } from "../middlewares/async-handler.middleware.js";

const router = Router();

const articleController = new ArticleController();

// Public - approved articles
router.get("/", asyncHandler(articleController.getAll.bind(articleController)));

// Admin - pending articles
router.get(
  "/pending",
  authenticate,
  authorize(Role.ADMIN),
  asyncHandler(articleController.getPendingArticles.bind(articleController)),
);

// User/Admin - own articles
router.get(
  "/me",
  authenticate,
  asyncHandler(articleController.getMyArticles.bind(articleController)),
);

// Admin approve article
router.patch(
  "/:id/approve",
  authenticate,
  authorize(Role.ADMIN),
  asyncHandler(articleController.approve.bind(articleController)),
);

// Admin reject article
router.patch(
  "/:id/reject",
  authenticate,
  authorize(Role.ADMIN),
  asyncHandler(articleController.reject.bind(articleController)),
);

// Single article
router.get(
  "/:id",
  authenticate,
  asyncHandler(articleController.getById.bind(articleController)),
);

// Create article with image
router.post(
  "/",
  authenticate,
  upload.single("image"),
  validate(CreateArticleSchema),
  asyncHandler(articleController.create.bind(articleController)),
);

// Update article with image
router.put(
  "/:id",
  authenticate,
  upload.single("image"),
  validate(CreateArticleSchema),
  asyncHandler(articleController.update.bind(articleController)),
);

// Delete own article
router.delete(
  "/:id",
  authenticate,
  asyncHandler(articleController.delete.bind(articleController)),
);

export default router;
