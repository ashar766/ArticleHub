import { Router } from "express";
import { ArticleController } from "../controllers/article.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { CreateArticleSchema, Role } from "@articlehub/shared";
import { authorize } from "../middlewares/authorize.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = Router();
const articleController = new ArticleController();
// Public - approved articles
router.get("/", articleController.getAll.bind(articleController));
// Admin - pending articles
router.get("/pending", authenticate, authorize(Role.ADMIN), articleController.getPendingArticles.bind(articleController));
// User/Admin - own articles
router.get("/me", authenticate, articleController.getMyArticles.bind(articleController));
// Admin approve article
router.patch("/:id/approve", authenticate, authorize(Role.ADMIN), articleController.approve.bind(articleController));
// Admin reject article
router.patch("/:id/reject", authenticate, authorize(Role.ADMIN), articleController.reject.bind(articleController));
// Single article
router.get("/:id", authenticate, articleController.getById.bind(articleController));
// Create article with image
router.post("/", authenticate, upload.single("image"), validate(CreateArticleSchema), articleController.create.bind(articleController));
// Update article with image
router.put("/:id", authenticate, upload.single("image"), validate(CreateArticleSchema), articleController.update.bind(articleController));
// Delete own article
router.delete("/:id", authenticate, articleController.delete.bind(articleController));
export default router;
