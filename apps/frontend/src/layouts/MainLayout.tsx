import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getNotifications } from "../services/notification.services";
import { Role } from "@articlehub/shared";

function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async () => {
    if (!user) return;

    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await getNotifications(token);

      const unread = response.notifications.filter(
        (notification: any) => !notification.isRead,
      );

      setUnreadCount(unread.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight text-blue-600"
          >
            ArticleHub
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/" className="transition hover:text-blue-600">
              Home
            </Link>

            <Link
              to="/create-article"
              className="transition hover:text-blue-600"
            >
              Create
            </Link>

            <Link to="/my-articles" className="transition hover:text-blue-600">
              My Articles
            </Link>

            {user?.role === Role.ADMIN && (
              <>
                <Link to="/admin" className="transition hover:text-blue-600">
                  Dashboard
                </Link>

                <Link
                  to="/admin/pending"
                  className="transition hover:text-blue-600"
                >
                  Pending
                </Link>
              </>
            )}

            {user?.role === Role.USER && (
              <Link
                to="/notifications"
                className="relative transition hover:text-blue-600"
              >
                Notifications
                {unreadCount > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}

export default MainLayout;
