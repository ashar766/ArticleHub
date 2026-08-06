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
      <div className="mx-auto max-w-6xl py-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Articles</h1>
            <p className="mt-2 text-gray-500">
              Manage all the articles you've created.
            </p>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Articles Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Start writing your first article.
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
                      <div className="mb-4 flex items-center justify-between">
                        <span
                          className={`rounded-full px-4 py-1 text-sm font-semibold text-white ${
                            article.status === ArticleStatus.APPROVED
                              ? "bg-green-600"
                              : article.status === ArticleStatus.PENDING
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        >
                          {article.status}
                        </span>
                      </div>

                      <h2 className="mb-4 text-3xl font-bold text-gray-900">
                        {article.title}
                      </h2>

                      <p className="line-clamp-5 leading-8 text-gray-600">
                        {article.content}
                      </p>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link
                        to={`/edit-article/${article.id}`}
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(article.id)}
                        className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex h-[320px] items-center justify-center bg-gray-100 p-5">
                    {article.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${article.image}`}
                        alt={article.title}
                        className="h-full w-full rounded-xl object-contain"
                      />
                    ) : (
                      <div className="text-gray-400">No Image</div>
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
