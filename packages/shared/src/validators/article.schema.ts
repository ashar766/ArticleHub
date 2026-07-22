import { z } from "zod";

export const CreateArticleSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content is required"),
  image: z.string().optional(),
});