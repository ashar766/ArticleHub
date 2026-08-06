import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getNotifications } from "../services/notification.services";
import { Role } from "@articlehub/shared";

function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [unreadCount, setUnreadCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const closeMenu = () => setIsMenuOpen(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-yellow-600 md:text-3xl"
          >
            ArticleHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 md:flex">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/create-article" className={navLinkClass}>
              Create
            </NavLink>

            <NavLink to="/my-articles" className={navLinkClass}>
              My Articles
            </NavLink>

            {user?.role === Role.ADMIN && (
              <>
                <NavLink to="/admin" className={navLinkClass}>
                  Dashboard
                </NavLink>

                <NavLink to="/admin/pending" className={navLinkClass}>
                  Pending
                </NavLink>
              </>
            )}

            {user?.role === Role.USER && (
              <NavLink
                to="/notifications"
                className="relative text-gray-700 transition hover:text-blue-600"
              >
                Notifications
                {unreadCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-5 w-5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </NavLink>
            )}
          </div>

          {/* Desktop User Section */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="text-sm capitalize text-gray-500">{user?.role}</p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-2 hover:bg-gray-100 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t bg-white shadow-md md:hidden">
            <div className="space-y-1 px-4 py-4">
              <NavLink
                to="/"
                onClick={closeMenu}
                className="block rounded-md px-3 py-2 hover:bg-gray-100"
              >
                Home
              </NavLink>

              <NavLink
                to="/create-article"
                onClick={closeMenu}
                className="block rounded-md px-3 py-2 hover:bg-gray-100"
              >
                Create
              </NavLink>

              <NavLink
                to="/my-articles"
                onClick={closeMenu}
                className="block rounded-md px-3 py-2 hover:bg-gray-100"
              >
                My Articles
              </NavLink>

              {user?.role === Role.ADMIN && (
                <>
                  <NavLink
                    to="/admin"
                    onClick={closeMenu}
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/admin/pending"
                    onClick={closeMenu}
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Pending
                  </NavLink>
                </>
              )}

              {user?.role === Role.USER && (
                <NavLink
                  to="/notifications"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  <span>Notifications</span>

                  {unreadCount > 0 && (
                    <span className="rounded-full bg-red-600 px-2 py-1 text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              )}

              <div className="mt-4 border-t pt-4">
                <p className="font-semibold text-gray-800">
                  {user?.firstName} {user?.lastName}
                </p>

                <p className="mb-4 text-sm capitalize text-gray-500">
                  {user?.role}
                </p>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg bg-red-600 py-2 font-medium text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-6">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
