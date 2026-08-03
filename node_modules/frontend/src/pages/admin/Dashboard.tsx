import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../services/article.services";

type DashboardStats = {
  totalArticles: number;
  pendingArticles: number;
  approvedArticles: number;
  rejectedArticles: number;
};

function AdminDashboard() {
  const { token } = useAuth();

  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    pendingArticles: 0,
    approvedArticles: 0,
    rejectedArticles: 0,
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    if (!token) return;

    try {
      const response = await getDashboardStats(token);

      setStats(response.stats);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>

          <p className="mt-2 text-gray-500">
            Welcome back. Manage articles and monitor the platform.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">Total Articles</p>
            <h2 className="mt-2 text-4xl font-bold">{stats.totalArticles}</h2>
          </div>

          <div className="rounded-2xl bg-yellow-100 p-6 shadow">
            <p className="text-yellow-700">Pending</p>
            <h2 className="mt-2 text-4xl font-bold">{stats.pendingArticles}</h2>
          </div>

          <div className="rounded-2xl bg-green-100 p-6 shadow">
            <p className="text-green-700">Approved</p>
            <h2 className="mt-2 text-4xl font-bold">
              {stats.approvedArticles}
            </h2>
          </div>

          <div className="rounded-2xl bg-red-100 p-6 shadow">
            <p className="text-red-700">Rejected</p>
            <h2 className="mt-2 text-4xl font-bold">
              {stats.rejectedArticles}
            </h2>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="mt-10 rounded-2xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">Quick Actions</h2>

          <div className="flex flex-wrap gap-5">
            <Link
              to="/admin/pending"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-medium text-white hover:bg-yellow-600"
            >
              Review Pending Articles
            </Link>

            <Link
              to="/"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              View Website
            </Link>

            <Link
              to="/create-article"
              className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
            >
              Create Article
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboard;
