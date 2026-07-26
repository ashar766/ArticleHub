import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  getPendingArticles,
  approveArticle,
  rejectArticle,
} from "../../services/article.services";

import { useAuth } from "../../context/AuthContext";


type Article = {
  id: string;
  title: string;
  content: string;
  image?: string;
};


function PendingArticles() {

  const { token } = useAuth();

  const [articles, setArticles] = useState<Article[]>([]);



  const fetchPendingArticles = async () => {

    if (!token) return;

    try {

      const response = await getPendingArticles(token);

      console.log(
        "Pending articles:",
        response
      );

      setArticles(response.articles);

    } catch(error) {

      console.error(
        "Failed to fetch pending articles",
        error
      );

    }

  };



  useEffect(() => {

    fetchPendingArticles();

  }, [token]);




  const handleApprove = async (
    id:string
  ) => {

    if(!token) return;


    await approveArticle(
      id,
      token
    );


    fetchPendingArticles();

  };




  const handleReject = async (
    id:string
  ) => {

    if(!token) return;


    await rejectArticle(
      id,
      token
    );


    fetchPendingArticles();

  };





  return (
    <MainLayout>

      <h1 className="text-3xl font-bold">
        Pending Articles
      </h1>



      {
        articles.length === 0 && (
          <p className="mt-4">
            No pending articles.
          </p>
        )
      }



      <div className="mt-6 space-y-4">


        {
          articles.map((article)=>(
            <div
              key={article.id}
              className="rounded-lg bg-white p-5 shadow"
            >
              {article.image && (
                <img
                  src={`http://localhost:3000/${article.image}`}
                  alt={article.title}
                  className="mb-4 h-48 w-full rounded-lg object-cover"
                />
              )}

              <h2 className="text-xl font-bold">
                {article.title}
              </h2>


              <p className="mt-2">
                {article.content}
              </p>



              <div className="mt-4 flex gap-3">


                <button
                  onClick={() =>
                    handleApprove(article.id)
                  }
                  className="rounded bg-green-600 px-4 py-2 text-white"
                >
                  Approve
                </button>



                <button
                  onClick={() =>
                    handleReject(article.id)
                  }
                  className="rounded bg-red-600 px-4 py-2 text-white"
                >
                  Reject
                </button>


              </div>


            </div>
          ))
        }


      </div>


    </MainLayout>
  );
}


export default PendingArticles;