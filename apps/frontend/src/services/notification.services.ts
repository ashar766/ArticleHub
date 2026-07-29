import api from "../api/axios";

export const getNotifications = async (token: string) => {
  const response = await api.get("/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const markNotificationAsRead = async (id: string, token: string) => {
  const response = await api.patch(
    `/notifications/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
