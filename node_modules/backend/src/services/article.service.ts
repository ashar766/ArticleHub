import { prisma } from "../config/prisma.js";
import createHttpError from "http-errors";
import { CreateArticleSchema } from "@articlehub/shared";
import { z } from "zod";

type CreateArticleDto = z.infer<typeof CreateArticleSchema>;

export class ArticleService {

  async create(
    data: CreateArticleDto,
    userId: string
  ) {
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


    if (!article) {
      throw new createHttpError.NotFound(
        "Article not found"
      );
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
    data: Partial<CreateArticleDto>
  ) {

    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });


    if (!article) {
      throw new createHttpError.NotFound(
        "Article not found"
      );
    }


    // User can edit only own article
    // Admin can edit any article
    if (
      article.authorId !== userId &&
      role !== "ADMIN"
    ) {
      throw new createHttpError.Forbidden(
        "You are not allowed to update this article"
      );
    }


    const updatedArticle =
      await prisma.article.update({
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




  async delete(
    id: string,
    userId: string,
    role: string
  ) {

    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });


    if (!article) {
      throw new createHttpError.NotFound(
        "Article not found"
      );
    }


    // User can delete only own article
    // Admin can delete any article
    if (
      article.authorId !== userId &&
      role !== "ADMIN"
    ) {
      throw new createHttpError.Forbidden(
        "You are not allowed to delete this article"
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

    const articles =
      await prisma.article.findMany({
        where: {
          approved: false,
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

    const article =
      await prisma.article.findUnique({
        where: {
          id,
        },
      });


    if (!article) {
      throw new createHttpError.NotFound(
        "Article not found"
      );
    }


    const approvedArticle =
      await prisma.article.update({
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





  // Admin rejects article
  // Deletes it completely
  async reject(id: string) {

    const article =
      await prisma.article.findUnique({
        where: {
          id,
        },
      });


    if (!article) {
      throw new createHttpError.NotFound(
        "Article not found"
      );
    }


    await prisma.article.delete({
      where: {
        id,
      },
    });


    return {
      message: "Article rejected successfully",
    };
  }

}