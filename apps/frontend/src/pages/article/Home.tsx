import { useEffect, useState } from "react";

import { getAllArticles } from "../../services/article.services";
import ArticleCard from "../../components/article/ArticleCard";
import MainLayout from "../../layouts/MainLayout";

type Article = {
  id: string;
  title: string;
  content: string;
  image?: string;
};

function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await getAllArticles();
      setArticles(response.articles);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Page Header */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Latest Articles
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            Explore articles shared by our community. Stay informed, learn
            something new, and discover fresh ideas.
          </p>
        </div>

        {/* Articles */}
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800">
              No Articles Available
            </h2>

            <p className="mt-3 text-gray-500">
              There are no published articles yet. Check back later for new
              content.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Home;
