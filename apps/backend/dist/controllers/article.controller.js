import { ArticleService } from "../services/article.service.js";
export class ArticleController {
    articleService = new ArticleService();
    async create(req, res) {
        const result = await this.articleService.create(req.body, req.user.id);
        return res.status(201).json(result);
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
        const result = await this.articleService.update(req.params.id, req.user.id, req.body);
        return res.json(result);
    }
    async delete(req, res) {
        const result = await this.articleService.delete(req.params.id, req.user.id);
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
}
