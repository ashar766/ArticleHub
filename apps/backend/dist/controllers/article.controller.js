import { ArticleService } from "../services/article.service.js";
import { HttpStatus, Message } from "@articlehub/shared";
export class ArticleController {
    articleService = new ArticleService();
    async create(req, res) {
        const articleData = {
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : undefined,
        };
        const result = await this.articleService.create(articleData, req.user.id, req.user.role);
        return res.status(HttpStatus.CREATED).json(result);
    }
    async getAll(req, res) {
        const result = await this.articleService.getAll();
        return res.json(result);
    }
    async getById(req, res) {
        const result = await this.articleService.getById(req.params.id);
        return res.json(result);
    }
    async getMyArticles(req, res) {
        const result = await this.articleService.getMyArticles(req.user.id);
        return res.json(result);
    }
    async update(req, res) {
        const articleData = {
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : undefined,
        };
        const result = await this.articleService.update(req.params.id, req.user.id, req.user.role, articleData);
        return res.json(result);
    }
    async delete(req, res) {
        const result = await this.articleService.delete(req.params.id, req.user.id, req.user.role);
        return res.json(result);
    }
    async getPendingArticles(req, res) {
        const result = await this.articleService.getPendingArticles();
        return res.json(result);
    }
    async approve(req, res) {
        const result = await this.articleService.approve(req.params.id);
        return res.json(result);
    }
    async reject(req, res) {
        const { reason } = req.body;
        if (!reason) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: Message.REJECTION_REASON_REQUIRED,
            });
        }
        const result = await this.articleService.reject(req.params.id, reason);
        return res.json(result);
    }
    async getDashboardStats(req, res) {
        const result = await this.articleService.getDashboardStats();
        return res.json(result);
    }
}
