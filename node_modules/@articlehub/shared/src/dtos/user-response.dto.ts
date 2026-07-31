import { z } from "zod";
import { Role } from "../enums/role.enum.js";

export const UserResponseSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  role: z.enum(Role),
});

export type UserResponseDto = z.infer<typeof UserResponseSchema>;
