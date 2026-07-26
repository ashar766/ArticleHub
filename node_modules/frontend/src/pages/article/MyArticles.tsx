import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserLayout from "../../layouts/UserLayout";

import {
  getMyArticles,
  deleteArticle,
} from "../../services/article.services";

type Article = {
  id: string;
  title: string;
  content: string;
  approved: boolean;
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
    const confirmDelete = window.confirm(
      "Delete this article?"
    );

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

  return (
    <UserLayout>
      <h1 className="mb-6 text-3xl font-bold">
        My Articles
      </h1>

      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="space-y-5">
          {articles.map((article) => (
            <div
              key={article.id}
              className="rounded-lg bg-white p-5 shadow"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  {article.title}
                </h2>

                <span
                  className={`rounded px-3 py-1 text-sm text-white ${
                    article.approved
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {article.approved
                    ? "Approved"
                    : "Pending"}
                </span>
              </div>

              <p className="mt-3 text-gray-700">
                {article.content}
              </p>

              <div className="mt-5 flex gap-3">
                <Link
                  to={`/edit-article/${article.id}`}
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(article.id)
                  }
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </UserLayout>
  );
}

export default MyArticles;