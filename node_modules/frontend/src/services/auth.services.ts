import api from "../api/axios";
import type { z } from "zod";
import { LoginSchema, SignupSchema } from "@articlehub/shared";

type LoginDto = z.infer<typeof LoginSchema>;
type SignupDto = z.infer<typeof SignupSchema>;

export const signup = async (data: SignupDto) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const login = async (data: LoginDto) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async (
  token: string,
  password: string
) => {
  const response = await api.post("/auth/reset-password", {
    token,
    password,
  });

  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};