import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../authContext/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const { id } = useParams();
  const { user, loading } = useContext(ThemeContext);
  const axios = useAxios();
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { isPending: loading2, data: blogPost } = useQuery({
    queryKey: ["blog-details"],
    queryFn: async () => {
      const blog = await axios.get(`/blog/${id}`);
      return blog;
    },
  });

  const { isPending: loading3, data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const comments = await axios.get(`/comments/${id}`);
      return comments;
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data) => {
      return axios.post("/add-comment", data);
    },
    onSuccess: () => {
      toast.success("Added comment");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  let content;
  if (loading && loading2 && loading3) {
    content = <h3>loading...</h3>;
    return;
  }

  const { title, image, shortDescription, longDescription, userEmail, _id } =
    blogPost?.data[0] || {};

  const handleCommentSubmit = () => {
    mutate({
      owner: user.displayName,
      profile: user.photoURL,
      blog_id: _id,
      comment,
    });
  };

  return (
    <>
      {content ? (
        content
      ) : (
        <div className="p-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h1 className="text-2xl font-bold">{title}</h1>
              <img src={image} alt={title} className="my-4" />
              <p className="text-gray-600">{shortDescription}</p>
              <p className="mt-4">{longDescription}</p>
            </div>

            <div className="mt-6">
              {userEmail === user?.email && (
                <Link
                  to={`/update-blog/${id}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Update Blog
                </Link>
              )}
            </div>

            <div className="mt-6">
              {user && userEmail !== user?.email ? (
                <div>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows="4"
                    placeholder="Add your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleCommentSubmit}
                  >
                    Comment
                  </button>
                </div>
              ) : (
                user && (
                  <p className="text-gray-600">
                    You cannot comment on your own blog.
                  </p>
                )
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold">Comments</h2>
              {comments?.data?.map((comment) => (
                <div key={comment._id} className="mb-2">
                  <img
                    src={comment.profile}
                    alt={comment.owner}
                    className="w-8 h-8 rounded-full inline-block mr-2"
                  />
                  <span className="font-semibold">{comment.owner}: </span>
                  {comment.comment}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetails;
