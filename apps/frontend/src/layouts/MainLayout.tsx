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
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ArticleHub</h1>

        <div className="flex gap-5 items-center">
          <Link to="/">Home</Link>

          <Link to="/create-article">Create Article</Link>

          <Link to="/my-articles">My Articles</Link>

          {user?.role === Role.ADMIN && (
            <>
              <Link to="/admin">Admin Dashboard</Link>

              <Link to="/admin/pending">Pending Articles</Link>
            </>
          )}

          {user?.role === Role.USER && (
            <Link
              to="/notifications"
              className="relative rounded bg-gray-700 px-4 py-2 text-white"
            >
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}

export default MainLayout;
