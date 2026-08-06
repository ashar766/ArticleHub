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

    try {
      await markNotificationAsRead(id, token);

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Notifications
          </h1>

          <p className="mt-2 text-gray-600">
            Stay updated with your article activity.
          </p>
        </div>

        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No Notifications
            </h2>

            <p className="mt-2 text-gray-500">
              You don't have any updates right now.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6 ${
                  notification.isRead
                    ? "border-gray-200"
                    : "border-yellow-300 bg-yellow-50"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-bold text-gray-900">
                        {notification.title}
                      </h2>

                      {!notification.isRead && (
                        <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-2 leading-7 text-gray-600">
                      {notification.message}
                    </p>

                    <p className="mt-3 text-sm text-gray-400">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {!notification.isRead && (
                    <button
                      onClick={() => handleRead(notification.id)}
                      className="w-full rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-600 sm:w-auto"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Notifications;
