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
}