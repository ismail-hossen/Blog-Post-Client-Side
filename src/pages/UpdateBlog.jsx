import { useContext } from "react";
import useAxios from "../hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../authContext/AuthContext";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { loading } = useContext(ThemeContext);
  const { id } = useParams();
  const axios = useAxios();

  const { isPending, data: blog } = useQuery({
    queryKey: ["blog-details"],
    queryFn: async () => {
      const blog = await axios.get(`/blog/${id}`);
      return blog;
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data) => {
      return axios.put(`/update-blog/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Updating blog success");
    },
  });

  let content;
  if (isPending || loading) {
    content = <h3>loading...</h3>;
    return;
  }

  const {
    title,
    image,
    shortDescription,
    longDescription,
    category,
    userEmail,
    author,
    addedTime,
  } = blog.data[0] || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, image, shortDescription, longDescription, category } =
      e.target;
    mutate({
      title: title.value,
      image: image.value,
      shortDescription: shortDescription.value,
      longDescription: longDescription.value,
      category: category.value,
      userEmail,
      author,
      addedTime,
    });
  };

  const categoriesName = [
    "Astronomy",
    "Health & Wellness",
    "Photography",
    "Web Development",
    "Databases",
    "Technology",
    "Health",
    "Travel",
  ];

  return (
    <>
      {content ? (
        content
      ) : (
        <div className="max-w-md mx-auto my-8 p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Update Blog</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={title}
                className="mt-1 p-2 w-full rounded-md border border-gray-300"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                defaultValue={image}
                className="mt-1 p-2 w-full rounded-md border border-gray-300"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={category}
                className="mt-1 p-2 w-full rounded-md border border-gray-300"
              >
                {categoriesName.map((category, idx) => (
                  <option key={idx} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="shortDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Short Description
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                defaultValue={shortDescription}
                className="mt-1 p-2 w-full rounded-md border border-gray-300"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="longDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Long Description
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                defaultValue={longDescription}
                className="mt-1 p-2 w-full rounded-md border border-gray-300"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full inline-block transition duration-300"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateBlog;
