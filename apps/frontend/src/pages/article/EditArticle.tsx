import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserLayout from "../../layouts/UserLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import {
  getArticleById,
  updateArticle,
} from "../../services/article.services";


type ArticleForm = {
  title: string;
  content: string;
  image?: File;
};


function EditArticle() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [formData, setFormData] = useState<ArticleForm>({
    title: "",
    content: "",
  });


  const [oldImage, setOldImage] = useState("");

  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);



  useEffect(() => {

    loadArticle();

  }, []);




  const loadArticle = async () => {

    try {

      const token = localStorage.getItem("token");


      if (!token || !id) return;



      const response = await getArticleById(
        id,
        token
      );



      setFormData({

        title: response.article.title,

        content: response.article.content,

      });



      if(response.article.image){

        setOldImage(
          `http://localhost:3000${response.article.image}`
        );

      }


    } catch(error){

      console.error(error);

      alert(
        "Unable to load article"
      );


    } finally {

      setLoading(false);

    }

  };





  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {


    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });


  };






  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {


    const file = e.target.files?.[0];


    if(file){

      setFormData({

        ...formData,

        image:file,

      });



      setImagePreview(
        URL.createObjectURL(file)
      );

    }

  };






  const handleSubmit = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();



    try {


      const token = localStorage.getItem("token");


      if(!token || !id) return;



      setSaving(true);



      const data = new FormData();



      data.append(
        "title",
        formData.title
      );



      data.append(
        "content",
        formData.content
      );



      if(formData.image){

        data.append(
          "image",
          formData.image
        );

      }




      await updateArticle(
        id,
        data,
        token
      );



      alert(
        "Article updated successfully"
      );


      navigate("/my-articles");



    } catch(error){


      console.error(error);


      alert(
        "Unable to update article"
      );


    } finally {


      setSaving(false);


    }


  };





  if(loading){

    return (

      <UserLayout>

        <p>
          Loading article...
        </p>

      </UserLayout>

    );

  }





  return (

    <UserLayout>


      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">


        <h1 className="mb-6 text-3xl font-bold">

          Edit Article

        </h1>




        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >



          <Input

            label="Title"

            name="title"

            value={formData.title}

            onChange={handleChange}

          />




          <div>

            <label className="mb-2 block font-medium">

              Content

            </label>



            <textarea

              name="content"

              rows={8}

              value={formData.content}

              onChange={handleChange}

              className="w-full rounded-lg border p-3"

            />

          </div>





          <div>


            <label className="mb-2 block font-medium">

              Image

            </label>




            {(imagePreview || oldImage) && (

              <img

                src={
                  imagePreview || oldImage
                }

                alt="article"

                className="mb-3 h-48 w-full rounded-lg object-cover"

              />

            )}




            <input

              type="file"

              accept="image/*"

              onChange={handleImageChange}

              className="w-full rounded-lg border p-3"

            />



          </div>





          <Button

            type="submit"

            disabled={saving}

          >

            {
              saving
              ? "Updating..."
              : "Update Article"
            }


          </Button>



        </form>



      </div>


    </UserLayout>

  );

}


export default EditArticle;
