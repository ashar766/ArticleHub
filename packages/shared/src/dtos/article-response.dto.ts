import { z } from "zod";
import { ArticleStatus } from "../enums/article-status.enum.js";

export const ArticleResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  image: z.string().nullable().optional(),
  status: z.enum(ArticleStatus),
  rejectionReason: z.string().nullable().optional(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ArticleResponseDto = z.infer<typeof ArticleResponseSchema>;
