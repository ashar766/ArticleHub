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
        {/* Left Side */}
        <div className="flex flex-col justify-center p-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            {article.title}
          </h2>

          <p className="line-clamp-5 text-lg leading-8 text-gray-600">
            {article.content}
          </p>

          <button className="mt-6 w-fit rounded-lg bg-yellow-500 px-5 py-2 font-medium text-white transition hover:bg-yellow-600">
            Read More →
          </button>
        </div>

        {/* Right Side */}
        <div className="h-[320px] md:h-[320px]">
          {article.image ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${article.image}`}
              alt={article.title}
              className="h-full w-full object-contain"
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
