import { sendNotification } from "../socket/socket.js";
import { prisma } from "../config/prisma.js";
import createHttpError from "http-errors";
import { CreateArticleSchema } from "@articlehub/shared";
import { z } from "zod";

type CreateArticleDto = z.infer<typeof CreateArticleSchema>;

export class ArticleService {
  async create(data: CreateArticleDto, userId: string, role: string) {
    const article = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        image: data.image,
        authorId: userId,

        status: role === "ADMIN" ? "APPROVED" : "PENDING",
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
        status: "APPROVED", //use enum istead
      },
    });

    return {
      message: "Articles fetched successfully", //cpaital and underscore

      articles,
    };
  }

  async getById(id: string) {
    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      throw new createHttpError.NotFound("Article not found");
    }

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

  async update(
    id: string,
    userId: string,
    role: string,
    data: Partial<CreateArticleDto>,
  ) {
    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      throw new createHttpError.NotFound("Article not found");
    }

    // User can update only own article
    // Admin can update any article

    if (article.authorId !== userId && role !== "ADMIN") {
      throw new createHttpError.Forbidden(
        "You are not allowed to update this article",
      );
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

        ...(role !== "ADMIN" && {
          status: "PENDING",
          rejectionReason: null,
        }),
      },
    });

    return {
      message: "Article updated successfully",

      article: updatedArticle,
    };
  }

  async delete(id: string, userId: string, role: string) {
    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      throw new createHttpError.NotFound("Article not found");
    }

    if (article.authorId !== userId && role !== "ADMIN") {
      throw new createHttpError.Forbidden(
        "You are not allowed to delete this article",
      );
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
        status: "PENDING",
      },

      include: {
        author: true,
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
      throw new createHttpError.NotFound("Article not found");
    }

    const approvedArticle = await prisma.article.update({
      where: {
        id,
      },

      data: {
        status: "APPROVED",
        rejectionReason: null,
      },
    });

    return {
      message: "Article approved successfully",

      article: approvedArticle,
    };
  }

  async reject(id: string, reason: string) {
    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      throw new createHttpError.NotFound("Article not found");
    }

    await prisma.article.update({
      where: {
        id,
      },
      data: {
        status: "REJECTED",
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
      message: "Article rejected successfully",
    };
  }
}
