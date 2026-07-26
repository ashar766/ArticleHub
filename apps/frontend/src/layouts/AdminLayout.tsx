import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function AdminLayout({ children }: Props) {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-slate-800 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <h1 className="text-xl font-bold">
            Admin Panel
          </h1>

          <div className="flex items-center gap-6">
            <Link to="/admin">
              Dashboard
            </Link>

            <Link to="/admin/pending">
              Pending
            </Link>

            <span>
              {user?.firstName}
            </span>

            <button
              onClick={logout}
              className="rounded bg-red-600 px-3 py-1"
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

export default AdminLayout;