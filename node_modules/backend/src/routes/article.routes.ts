import { Router } from "express";

import { ArticleController } from "../controllers/article.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import { CreateArticleSchema } from "@articlehub/shared";

import { authorize } from "../middlewares/authorize.middleware.js";

import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

const articleController = new ArticleController();



// Public - approved articles
router.get(
  "/",
  articleController.getAll.bind(articleController)
);




// Admin - pending articles
router.get(
  "/pending",
  authenticate,
  authorize("ADMIN"),
  articleController.getPendingArticles.bind(
    articleController
  )
);




// User/Admin - own articles
router.get(
  "/me",
  authenticate,
  articleController.getMyArticles.bind(
    articleController
  )
);





// Admin approve article
router.patch(
  "/:id/approve",
  authenticate,
  authorize("ADMIN"),
  articleController.approve.bind(
    articleController
  )
);





// Admin reject article
// deletes article completely
router.delete(
  "/:id/reject",
  authenticate,
  authorize("ADMIN"),
  articleController.reject.bind(
    articleController
  )
);





// Single approved article
router.get(
  "/:id",
  articleController.getById.bind(
    articleController
  )
);





// User/Admin create article
router.post(
  "/",
  authenticate,
  upload.single("image"),
  //validate(CreateArticleSchema),
  articleController.create.bind(
    articleController
  )
);





// User/Admin update article
router.put(
  "/:id",
  authenticate,
  validate(CreateArticleSchema),
  articleController.update.bind(
    articleController
  )
);





// User/Admin delete article
router.delete(
  "/:id",
  authenticate,
  articleController.delete.bind(
    articleController
  )
);



export default router;