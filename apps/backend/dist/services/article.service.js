import { sendNotification } from "../socket/socket.js";
import { prisma } from "../config/prisma.js";
import createHttpError from "http-errors";
import { Message, Role, ArticleStatus, } from "@articlehub/shared";
export class ArticleService {
    async create(data, userId, role) {
        const article = await prisma.article.create({
            data: {
                title: data.title,
                content: data.content,
                image: data.image,
                authorId: userId,
                status: role === Role.ADMIN ? ArticleStatus.APPROVED : ArticleStatus.PENDING,
            },
        });
        return {
            message: Message.ARTICLE_CREATED_SUCCESSFULLY,
            article,
        };
    }
    async getAll() {
        const articles = await prisma.article.findMany({
            where: {
                status: ArticleStatus.APPROVED, //use enum istead
            },
        });
        return {
            message: Message.ARTICLES_FETCHED_SUCCESSFULLY,
            articles,
        };
    }
    async getById(id) {
        const article = await prisma.article.findUnique({
            where: {
                id,
            },
        });
        if (!article) {
            throw new createHttpError.NotFound(Message.ARTICLE_NOT_FOUND);
        }
        return {
            message: Message.ARTICLE_FETCHED_SUCCESSFULLY,
            article,
        };
    }
    async getMyArticles(userId) {
        const articles = await prisma.article.findMany({
            where: {
                authorId: userId,
            },
        });
        return {
            message: Message.MY_ARTICLES_FETCHED_SUCCESSFULLY,
            articles,
        };
    }
    async update(id, userId, role, data) {
        const article = await prisma.article.findUnique({
            where: {
                id,
            },
        });
        if (!article) {
            throw new createHttpError.NotFound(Message.ARTICLE_NOT_FOUND);
        }
        // User can update only own article
        // Admin can update any article
        if (article.authorId !== userId && role !== Role.ADMIN) {
            throw new createHttpError.Forbidden(Message.FORBIDDEN);
        }
        const updatedArticle = await prisma.article.update({
            where: {
                id,
            },
            data: {
                title: data.title,
                content: data.content,
                ...(data.image && {
                    image: data.image,
                }),
                ...(role !== Role.ADMIN && {
                    status: ArticleStatus.PENDING,
                    rejectionReason: null,
                }),
            },
        });
        return {
            message: Message.ARTICLE_UPDATED_SUCCESSFULLY,
            article: updatedArticle,
        };
    }
    async delete(id, userId, role) {
        const article = await prisma.article.findUnique({
            where: {
                id,
            },
        });
        if (!article) {
            throw new createHttpError.NotFound(Message.ARTICLE_NOT_FOUND);
        }
        if (article.authorId !== userId && role !== Role.ADMIN) {
            throw new createHttpError.Forbidden(Message.FORBIDDEN);
        }
        await prisma.article.delete({
            where: {
                id,
            },
        });
        return {
            message: Message.ARTICLE_DELETED_SUCCESSFULLY,
        };
    }
    async getPendingArticles() {
        const articles = await prisma.article.findMany({
            where: {
                status: ArticleStatus.PENDING,
            },
            include: {
                author: true,
            },
        });
        return {
            message: Message.ARTICLES_FETCHED_SUCCESSFULLY,
            articles,
        };
    }
    async approve(id) {
        const article = await prisma.article.findUnique({
            where: {
                id,
            },
        });
        if (!article) {
            throw new createHttpError.NotFound(Message.ARTICLE_NOT_FOUND);
        }
        const approvedArticle = await prisma.article.update({
            where: {
                id,
            },
            data: {
                status: ArticleStatus.APPROVED,
                rejectionReason: null,
            },
        });
        return {
            message: Message.ARTICLE_APPROVED_SUCCESSFULLY,
            article: approvedArticle,
        };
    }
    async reject(id, reason) {
        const article = await prisma.article.findUnique({
            where: {
                id,
            },
        });
        if (!article) {
            throw new createHttpError.NotFound(Message.ARTICLE_NOT_FOUND);
        }
        await prisma.article.update({
            where: {
                id,
            },
            data: {
                status: ArticleStatus.REJECTED,
                rejectionReason: reason,
            },
        });
        const notification = await prisma.notification.create({
            data: {
                userId: article.authorId,
                title: "Article Rejected",
                message: `Your article "${article.title}" was rejected.\nReason: ${reason}`,
            },
        });
        console.log("Notification created:", notification);
        sendNotification(article.authorId, notification);
        return {
            message: Message.ARTICLE_REJECTED_SUCCESSFULLY,
        };
    }
}
