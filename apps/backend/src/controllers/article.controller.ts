import { Request, Response } from "express";
import { ArticleService } from "../services/article.service.js";

export class ArticleController {
  private articleService = new ArticleService();

  async create(req: Request, res: Response) {
    const articleData = {
      ...req.body,

      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    };

    const result = await this.articleService.create(
      articleData,
      req.user!.id,
      req.user!.role,
    );

    return res.status(201).json(result);
  }

  async getAll(req: Request, res: Response) {
    const result = await this.articleService.getAll();

    return res.json(result);
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    const result = await this.articleService.getById(req.params.id);

    return res.json(result);
  }

  async getMyArticles(req: Request, res: Response) {
    const result = await this.articleService.getMyArticles(req.user!.id);

    return res.json(result);
  }

  async update(req: Request<{ id: string }>, res: Response) {
    const articleData = {
      ...req.body,

      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    };

    const result = await this.articleService.update(
      req.params.id,
      req.user!.id,
      req.user!.role,
      articleData,
    );

    return res.json(result);
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const result = await this.articleService.delete(
      req.params.id,
      req.user!.id,
      req.user!.role,
    );

    return res.json(result);
  }

  async getPendingArticles(req: Request, res: Response) {
    const result = await this.articleService.getPendingArticles();

    return res.json(result);
  }

  async approve(req: Request<{ id: string }>, res: Response) {
    const result = await this.articleService.approve(req.params.id);

    return res.json(result);
  }

  async reject(req: Request<{ id: string }>, res: Response) {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        message: "Rejection reason is required",
      });
    }

    const result = await this.articleService.reject(req.params.id, reason);

    return res.json(result);
  }
}
