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

      console.log("My Articles:", response.articles);

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

  return (
    <MainLayout>
      <h1 className="mb-6 text-3xl font-bold">My Articles</h1>

      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="space-y-5">
          {articles.map((article) => (
            <div key={article.id} className="rounded-lg bg-white p-5 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{article.title}</h2>

                <span
                  className={`rounded px-3 py-1 text-sm text-white ${
                    article.status === ArticleStatus.APPROVED
                      ? "bg-green-500"
                      : article.status === ArticleStatus.PENDING
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                >
                  {article.status === ArticleStatus.APPROVED
                    ? ArticleStatus.APPROVED
                    : article.status === ArticleStatus.PENDING
                      ? ArticleStatus.PENDING
                      : ArticleStatus.REJECTED}
                </span>
              </div>

              {article.image && (
                <img
                  src={`http://localhost:3000${article.image}`}
                  alt={article.title}
                  className="mt-4 h-64 w-full rounded-lg object-cover"
                />
              )}

              <p className="mt-3 text-gray-700">{article.content}</p>

              <div className="mt-5 flex gap-3">
                <Link
                  to={`/edit-article/${article.id}`}
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(article.id)}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default MyArticles;
