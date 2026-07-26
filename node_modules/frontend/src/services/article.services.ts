import api from "../api/axios";

export const createArticle = async (
  data: {
    title: string;
    content: string;
  },
  token: string
) => {
  const response = await api.post(
    "/articles",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAllArticles = async () => {
  const response = await api.get("/articles");

  return response.data;
};

export const getMyArticles = async (
  token: string
) => {
  const response = await api.get(
    "/articles/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateArticle = async (
  id: string,
  data: {
    title: string;
    content: string;
  },
  token: string
) => {
  const response = await api.put(
    `/articles/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteArticle = async (
  id: string,
  token: string
) => {
  const response = await api.delete(
    `/articles/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getPendingArticles = async (
  token: string
) => {
  const response = await api.get(
    "/articles/pending",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const approveArticle = async (
  id: string,
  token: string
) => {
  const response = await api.patch(
    `/articles/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const rejectArticle = async (
  id: string,
  token: string
) => {
  const response = await api.delete(
    `/articles/${id}/reject`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};