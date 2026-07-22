import { Request, Response } from "express";
import { ArticleService } from "../services/article.service.js";

export class ArticleController {
  private articleService = new ArticleService();

  async create(req: Request, res: Response) {
    const result = await this.articleService.create(
      req.body,
      req.user!.id
    );

    return res.status(201).json(result);
  }
}