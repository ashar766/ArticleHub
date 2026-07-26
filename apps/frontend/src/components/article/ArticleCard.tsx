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
    <div className="rounded-xl border bg-white p-5 shadow">

      <h2 className="text-xl font-bold">
        {article.title}
      </h2>

      {article.image && (
        <img
          src={`http://localhost:3000${article.image}`}
          alt={article.title}
          className="mt-4 h-64 w-full rounded-lg object-cover"
        />
      )}

      <p className="mt-3 text-gray-700">
        {article.content}
      </p>

    </div>
  );
}

export default ArticleCard;