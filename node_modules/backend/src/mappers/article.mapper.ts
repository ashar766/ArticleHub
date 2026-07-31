import { Article } from "../generated/prisma/client.js";

export const toArticleResponseDto = (article: Article) => ({
  id: article.id,
  title: article.title,
  content: article.content,
  image: article.image,
  status: article.status,
  rejectionReason: article.rejectionReason,
  authorId: article.authorId,
  createdAt: article.createdAt,
  updatedAt: article.updatedAt,
});
