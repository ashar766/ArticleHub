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
      <div className="mx-auto max-w-5xl py-12">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-10 py-8 text-white">
            <h1 className="text-4xl font-bold">Create New Article</h1>
            <p className="mt-2 text-blue-100">
              Share your ideas with the community.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-10">
            <Input
              label="Article Title"
              {...register("title", {
                required: "Title is required",
              })}
              error={errors.title?.message}
            />

            <div>
              <label className="mb-2 block text-lg font-semibold text-gray-700">
                Content
              </label>

              <textarea
                rows={10}
                {...register("content", {
                  required: "Content is required",
                })}
                className="w-full rounded-xl border border-gray-300 p-4 text-gray-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Write your article here..."
              />

              {errors.content && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-lg font-semibold text-gray-700">
                Featured Image
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="block w-full cursor-pointer rounded-xl border border-dashed border-gray-400 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
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
