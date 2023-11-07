import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { useContext } from "react";
import { ThemeContext } from "../authContext/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const WishList = () => {
  const { user } = useContext(ThemeContext);
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data: wishlist, isPending } = useQuery({
    queryKey: ["wishlistByUser"],
    queryFn: async () => {
      const blog = await axios.get(`/wishlist?email=${user?.email}`);
      return blog;
    },
  });

  const { mutate } = useMutation({
    mutationFn: (id) => {
      return axios.delete(`/remove-wishlist/${id}`);
    },
    onSuccess: () => {
      toast.success("Remove success");
      queryClient.invalidateQueries({ queryKey: ["wishlistByUser"] });
    },
  });

  const handleRemoveWishlist = (id) => {
    mutate(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending ? (
          <h1>loading</h1>
        ) : wishlist.data.length > 0 ? (
          wishlist.data.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md mb-8 p-4"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.shortDescription}</p>
              <p className="text-blue-500 mt-2">{post.category}</p>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/blog-details/${post._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleRemoveWishlist(post._id)}
                  className="text-blue-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2>You have no wishlist.</h2>
        )}
      </div>
    </div>
  );
};

export default WishList;
