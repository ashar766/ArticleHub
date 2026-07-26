import { useEffect, useState } from "react";

import { getAllArticles } from "../../services/article.services";

import ArticleCard from "../../components/article/ArticleCard"

import UserLayout from "../../layouts/UserLayout";

type Article = {
  id: string;
  title: string;
  content: string;
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
    <UserLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Latest Articles
        </h1>

        <div className="space-y-5">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>
    </UserLayout>
  );
}

export default Home;