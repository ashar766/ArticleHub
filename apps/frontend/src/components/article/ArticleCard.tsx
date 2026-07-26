type Article = {
  id: string;
  title: string;
  content: string;
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

      <p className="mt-3 text-gray-700">
        {article.content}
      </p>
    </div>
  );
}

export default ArticleCard;