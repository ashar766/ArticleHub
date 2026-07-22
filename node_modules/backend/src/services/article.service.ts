import { prisma } from "../config/prisma.js";

export class ArticleService {
  async create(data: any, userId: string) {
    const article = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        image: data.image,
        authorId: userId,
      },
    });

    return {
      message: "Article created successfully",
      article,
    };
  }

  async getAll() {
    const articles = await prisma.article.findMany({
        where: {
        approved: true,
        },
    });

    return {
        message: "Articles fetched successfully",
        articles,
    };
  }

  async getById(id: string) {
    const article = await prisma.article.findFirst({
      where: {
        id,
        approved: true,
        },
    });

    return {
        message: "Article fetched successfully",
        article,
    };
  }

  async getMyArticles(userId: string) {
    const articles = await prisma.article.findMany({
        where: {
        authorId: userId,
        },
    });

    return {
        message: "My articles fetched successfully",
        articles,
    };
  }

  async update(id: string, userId: string, data: any) {
    const article = await prisma.article.findUnique({
        where: {
        id,
        },
    });

    if (!article) {
        throw new Error("Article not found");
    }

    if (article.authorId !== userId) {
        throw new Error("You are not allowed to update this article");
    }

    const updatedArticle = await prisma.article.update({
        where: {
        id,
        },
        data: {
        title: data.title,
        content: data.content,
        image: data.image,
        },
    });

    return {
        message: "Article updated successfully",
        article: updatedArticle,
    };
  }

  async delete(id: string, userId: string) {
    const article = await prisma.article.findUnique({
        where: {
        id,
        },
    });

    if (!article) {
        throw new Error("Article not found");
    }

    if (article.authorId !== userId) {
        throw new Error("You are not allowed to delete this article");
    }

    await prisma.article.delete({
        where: {
        id,
        },
    });

    return {
        message: "Article deleted successfully",
    };
  }

  async getPendingArticles() {
    const articles = await prisma.article.findMany({
        where: {
        approved: false,
        },
    });

    return {
        message: "Pending articles fetched successfully",
        articles,
    };
  }

  async approve(id: string) {
    const article = await prisma.article.findUnique({
        where: {
        id,
        },
    });

    if (!article) {
        throw new Error("Article not found");
    }

    const approvedArticle = await prisma.article.update({
        where: {
        id,
        },
        data: {
        approved: true,
        },
    });

    return {
        message: "Article approved successfully",
        article: approvedArticle,
    };
  }
}