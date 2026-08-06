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
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Welcome back. Manage articles and monitor the platform.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm text-gray-500">Total Articles</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              {stats.totalArticles}
            </h2>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-yellow-700">Pending</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              {stats.pendingArticles}
            </h2>
          </div>

          <div className="rounded-2xl bg-green-50 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-green-700">Approved</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              {stats.approvedArticles}
            </h2>
          </div>

          <div className="rounded-2xl bg-red-50 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-red-700">Rejected</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              {stats.rejectedArticles}
            </h2>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              to="/admin/pending"
              className="rounded-xl bg-yellow-500 px-6 py-3 text-center font-medium text-white transition hover:bg-yellow-600"
            >
              Review Pending Articles
            </Link>

            <Link
              to="/"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-700"
            >
              View Website
            </Link>

            <Link
              to="/create-article"
              className="rounded-xl bg-green-600 px-6 py-3 text-center font-medium text-white transition hover:bg-green-700"
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
