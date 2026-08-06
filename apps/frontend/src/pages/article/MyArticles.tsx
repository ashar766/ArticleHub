import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { getMyArticles, deleteArticle } from "../../services/article.services";

import { ArticleStatus } from "@articlehub/shared";

type Article = {
  id: string;
  title: string;
  content: string;
  status:
    | ArticleStatus.PENDING
    | ArticleStatus.APPROVED
    | ArticleStatus.REJECTED;
  image?: string;
};

function MyArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await getMyArticles(token);

      setArticles(response.articles);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this article?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      await deleteArticle(id, token);

      loadArticles();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusClasses = (status: ArticleStatus) => {
    switch (status) {
      case ArticleStatus.APPROVED:
        return "bg-green-100 text-green-700";

      case ArticleStatus.PENDING:
        return "bg-yellow-100 text-yellow-700";

      case ArticleStatus.REJECTED:
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Articles
          </h1>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            View, edit, and manage every article you've created.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800">
              No Articles Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Create your first article to get started.
            </p>

            <Link
              to="/create-article"
              className="mt-6 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-white transition hover:bg-yellow-600"
            >
              Create Article
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Content */}
                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      <span
                        className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold ${getStatusClasses(
                          article.status,
                        )}`}
                      >
                        {article.status}
                      </span>

                      <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
                        {article.title}
                      </h2>

                      <p className="mt-4 line-clamp-5 leading-7 text-gray-600">
                        {article.content}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        to={`/edit-article/${article.id}`}
                        className="rounded-xl bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(article.id)}
                        className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex h-64 items-center justify-center bg-gray-100 p-4 sm:h-80">
                    {article.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${article.image}`}
                        alt={article.title}
                        className="h-full w-full rounded-xl object-contain"
                      />
                    ) : (
                      <div className="text-center text-gray-400">
                        No Image Available
                      </div>
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

export default MyArticles;
