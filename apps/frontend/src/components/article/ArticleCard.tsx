import { Link } from "react-router-dom";

type Article = {
  id: string;
  title: string;
  content: string;
  image?: string;
};

type Props = {
  article: Article;
};

function ArticleCard({ article }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Content */}
        <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            {article.title}
          </h2>

          <p className="line-clamp-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {article.content}
          </p>

          <Link
            to={`/articles/${article.id}`}
            className="mt-5 w-fit rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-600 sm:mt-6 sm:px-5 sm:text-base"
          >
            Read More →
          </Link>
        </div>

        {/* Image */}
        <div className="h-56 sm:h-72 md:h-[320px]">
          {article.image ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${article.image}`}
              alt={article.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
              No Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
