import { z } from "zod";
export const SignupSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export const LoginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
