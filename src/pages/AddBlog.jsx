import { useContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { ThemeContext } from "../authContext/AuthContext";
import toast from "react-hot-toast";

const AddBlog = () => {
  const { user } = useContext(ThemeContext);
  const axios = useAxios();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    shortDescription: "",
    longDescription: "",
    category: "Technology",
    userEmail: user?.email,
    author: user?.displayName,
    profile: user?.photoURL,
  });

  const { mutate } = useMutation({
    mutationFn: (data) => {
      return axios.post(`/add-blog?email=${user?.email}`, data);
    },
    onSuccess: () => {
      toast.success("Added blog successfully");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
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
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
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
            value={formData.title}
            onChange={handleChange}
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
            value={formData.image}
            onChange={handleChange}
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
            value={formData.category}
            onChange={handleChange}
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
            value={formData.shortDescription}
            onChange={handleChange}
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
            value={formData.longDescription}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full inline-block transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
