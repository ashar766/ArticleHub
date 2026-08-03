import api from "../api/axios";

export const createArticle = async (data: FormData, token: string) => {
  const response = await api.post("/articles", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAllArticles = async () => {
  const response = await api.get("/articles");

  return response.data;
};

export const getMyArticles = async (token: string) => {
  const response = await api.get("/articles/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateArticle = async (
  id: string,
  data: FormData,
  token: string,
) => {
  const response = await api.put(`/articles/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteArticle = async (id: string, token: string) => {
  const response = await api.delete(`/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getPendingArticles = async (token: string) => {
  const response = await api.get("/articles/pending", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const approveArticle = async (id: string, token: string) => {
  const response = await api.patch(
    `/articles/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const rejectArticle = async (
  id: string,
  reason: string,
  token: string,
) => {
  const response = await api.patch(
    `/articles/${id}/reject`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getArticleById = async (id: string, token: string) => {
  const response = await api.get(`/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getDashboardStats = async (token: string) => {
  const response = await api.get("/articles/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
