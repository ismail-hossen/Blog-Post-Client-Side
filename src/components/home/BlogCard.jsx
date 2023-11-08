import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { ThemeContext } from "../../authContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blogs }) => {
  const {
    image,
    title,
    shortDescription,
    category,
    addedTime,
    author,
    longDescription,
    _id,
  } = blogs || {};
  const axios = useAxios();
  const { user } = useContext(ThemeContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data) => {
      return axios.post(`/wishlist?email=${user?.email}`, data, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      toast.success("See the wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlistByUser"] });
    },
  });

  const addToWishList = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    mutate({
      image,
      title,
      shortDescription,
      category,
      addedTime,
      author,
      longDescription,
      email: user?.email,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-white rounded-lg shadow-md mb-8 p-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="text-xl font-semibold mt-2">{title}</h2>
        <p className="text-gray-600 mt-2">{shortDescription}</p>
        <p className="text-blue-500 mt-2">{category}</p>
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/blog-details/${_id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            Details
          </Link>
          <button onClick={addToWishList} className="text-blue-500">
            Add to Wishlist
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
