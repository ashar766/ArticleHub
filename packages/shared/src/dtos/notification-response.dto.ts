import { z } from "zod";

export const NotificationResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
});

export type NotificationResponseDto = z.infer<
  typeof NotificationResponseSchema
>;
