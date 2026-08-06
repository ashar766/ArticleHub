import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { getArticleById, updateArticle } from "../../services/article.services";

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

      const response = await getArticleById(id, token);

      setFormData({
        title: response.article.title,
        content: response.article.content,
      });

      if (response.article.image) {
        setOldImage(`${import.meta.env.VITE_API_URL}${response.article.image}`);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to load article");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token || !id) return;

      setSaving(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("content", formData.content);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await updateArticle(id, data, token);

      alert("Article updated successfully");

      navigate("/my-articles");
    } catch (error) {
      console.error(error);
      alert("Unable to update article");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-4">
          <p className="text-lg font-medium text-gray-600">
            Loading article...
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-amber-400 px-6 py-6 text-white sm:px-8">
            <h1 className="text-2xl font-bold sm:text-3xl">Edit Article</h1>

            <p className="mt-2 text-sm text-yellow-100 sm:text-base">
              Update your article and save your latest changes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
            <Input
              label="Article Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Content
              </label>

              <textarea
                name="content"
                rows={10}
                value={formData.content}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 p-4 text-gray-700 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Article Image
              </label>

              {(imagePreview || oldImage) && (
                <div className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                  <img
                    src={imagePreview || oldImage}
                    alt="Article"
                    className="h-56 w-full object-contain sm:h-72"
                  />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full cursor-pointer rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-yellow-500 hover:bg-yellow-50"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/my-articles")}
                className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <Button type="submit" disabled={saving}>
                {saving ? "Updating..." : "Update Article"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditArticle;
