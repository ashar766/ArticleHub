import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import UserLayout from "../../layouts/UserLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { createArticle } from "../../services/article.services";

type CreateArticleDto = {
  title: string;
  content: string;
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

      const response = await createArticle(data, token);

      alert(response.message);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Unable to create article");
    }
  };

  return (
    <UserLayout>
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Create Article
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input
            label="Title"
            {...register("title", {
              required: "Title is required",
            })}
            error={errors.title?.message}
          />

          <div>
            <label className="mb-2 block font-medium">
              Content
            </label>

            <textarea
              rows={8}
              {...register("content", {
                required: "Content is required",
              })}
              className="w-full rounded-lg border p-3"
            />

            {errors.content && (
              <p className="mt-1 text-sm text-red-500">
                {errors.content.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Publishing..."
              : "Publish Article"}
          </Button>
        </form>
      </div>
    </UserLayout>
  );
}

export default CreateArticle;