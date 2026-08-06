import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { createArticle } from "../../services/article.services";

type CreateArticleDto = {
  title: string;
  content: string;
  image: FileList;
};

function CreateArticle() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateArticleDto>();

  const onSubmit = async (data: CreateArticleDto) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("content", data.content);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await createArticle(formData, token);

      alert(response.message);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Unable to create article");
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-amber-400 px-6 py-6 text-white sm:px-8 lg:px-10">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Create New Article
            </h1>

            <p className="mt-2 text-sm text-yellow-100 sm:text-base">
              Share your ideas with the community.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 p-5 sm:p-8 lg:p-10"
          >
            <Input
              label="Article Title"
              placeholder="Enter article title"
              {...register("title", {
                required: "Title is required",
              })}
              error={errors.title?.message}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Content
              </label>

              <textarea
                rows={10}
                placeholder="Write your article here..."
                {...register("content", {
                  required: "Content is required",
                })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.content && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Featured Image
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="block w-full cursor-pointer rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600 transition duration-200 file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:font-medium file:text-white hover:border-yellow-500 hover:bg-yellow-50"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto sm:px-8"
              >
                {isSubmitting ? "Publishing..." : "Publish Article"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default CreateArticle;
