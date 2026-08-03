import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  getNotifications,
  markNotificationAsRead,
} from "../../services/notification.services";

import { useAuth } from "../../context/AuthContext";

type Notification = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

function Notifications() {
  const { token } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    if (!token) return;

    try {
      const response = await getNotifications(token);
      setNotifications(response.notifications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const handleRead = async (id: string) => {
    if (!token) return;

    await markNotificationAsRead(id, token);

    fetchNotifications();
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl py-10">
        <h1 className="mb-6 text-3xl font-bold">Notifications</h1>

        {notifications.length === 0 ? (
          <p>No notifications.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="relative rounded-lg bg-white p-5 shadow"
              >
                <button
                  onClick={() => handleRead(notification.id)}
                  className="
                absolute
                right-3
                top-3
                text-gray-500
                hover:text-red-500
                "
                >
                  ✕
                </button>

                <h2 className="font-bold">{notification.title}</h2>

                <p>{notification.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Notifications;
