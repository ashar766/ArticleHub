import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function UserLayout({ children }: Props) {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <h1 className="text-xl font-bold">
            ArticleHub
          </h1>

          <div className="flex items-center gap-6">
            <Link to="/">Home</Link>

            <Link to="/create-article">
              Create
            </Link>

            <Link to="/my-articles">
              My Articles
            </Link>

            <span className="font-medium">
              {user?.firstName}
            </span>

            <button
              onClick={logout}
              className="rounded bg-red-500 px-3 py-1 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl p-6">
        {children}
      </main>
    </div>
  );
}

export default UserLayout;