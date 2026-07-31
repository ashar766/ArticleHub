import { User } from "../generated/prisma/client.js";

export const toUserResponseDto = (user: User) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
});
