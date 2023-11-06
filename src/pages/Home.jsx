import { useQuery } from "@tanstack/react-query";
import HeroSection from "../components/home/HeroSection";
import NewsLetter from "../components/home/NewsLetter";
import useAxios from "../hooks/useAxios";

const Home = () => {
  const axios = useAxios();
  const {
    isPending,
    error,
    data: blogPosts,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const data = await axios.get("/recent-blogs");
      return data;
    },
  });

  let content;
  if (isPending) {
    content = <h3>loading...</h3>;
    return;
  }
  if (error) {
    content = <p>{"An error has occurred: " + error.message}</p>;
    return;
  }

  return (
    <>
      <HeroSection />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold mb-4">Recent Blog Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {content
            ? content
            : blogPosts.data.map((post, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md mb-8 p-4"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                  <p className="text-blue-500 mt-2">{post.category}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                      Details
                    </button>
                    <button className="text-blue-500">Add to Wishlist</button>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <NewsLetter />
    </>
  );
};

export default Home;
