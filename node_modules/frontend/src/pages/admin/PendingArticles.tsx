import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  getPendingArticles,
  approveArticle,
  rejectArticle,
} from "../../services/article.services";

import { useAuth } from "../../context/AuthContext";

type Article = {
  id: string;
  title: string;
  content: string;
  image?: string;
};

function PendingArticles() {
  const { token } = useAuth();

  const [articles, setArticles] = useState<Article[]>([]);

  const fetchPendingArticles = async () => {
    if (!token) return;

    try {
      const response = await getPendingArticles(token);

      console.log("Pending articles:", response);

      setArticles(response.articles);
    } catch (error) {
      console.error("Failed to fetch pending articles", error);
    }
  };

  useEffect(() => {
    fetchPendingArticles();
  }, [token]);

  const handleApprove = async (id: string) => {
    if (!token) return;

    await approveArticle(id, token);

    fetchPendingArticles();
  };

  const handleReject = async (id: string) => {
    if (!token) return;

    const reason = window.prompt("Enter rejection reason:");

    if (!reason || reason.trim() === "") {
      alert("Rejection reason is required.");
      return;
    }

    try {
      await rejectArticle(id, reason, token);

      fetchPendingArticles();
    } catch (error) {
      console.error(error);

      alert("Failed to reject article.");
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Pending Articles</h1>
          <p className="mt-2 text-gray-500">
            Review submitted articles and decide whether to approve or reject
            them.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Pending Articles
            </h2>

            <p className="mt-3 text-gray-500">
              All submitted articles have already been reviewed.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left Side */}
                  <div className="flex flex-col justify-between p-8">
                    <div>
                      <span className="mb-4 inline-block rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                        Pending Review
                      </span>

                      <h2 className="mb-4 text-3xl font-bold text-gray-900">
                        {article.title}
                      </h2>

                      <p className="line-clamp-6 leading-8 text-gray-600">
                        {article.content}
                      </p>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <button
                        onClick={() => handleApprove(article.id)}
                        className="rounded-xl bg-green-600 px-6 py-2 font-medium text-white transition hover:bg-green-700"
                      >
                        ✓ Approve
                      </button>

                      <button
                        onClick={() => handleReject(article.id)}
                        className="rounded-xl bg-red-600 px-6 py-2 font-medium text-white transition hover:bg-red-700"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex h-[320px] items-center justify-center bg-gray-100 p-5">
                    {article.image ? (
                      <img
                        src={`http://localhost:3000${article.image}`}
                        alt={article.title}
                        className="h-full w-full rounded-xl object-contain"
                      />
                    ) : (
                      <div className="text-gray-400">No Image Available</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default PendingArticles;
