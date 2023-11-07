import { useQuery } from "@tanstack/react-query";
import HeroSection from "../components/home/HeroSection";
import NewsLetter from "../components/home/NewsLetter";
import useAxios from "../hooks/useAxios";
import BlogCard from "../components/home/BlogCard";

const Home = () => {
  const axios = useAxios();
  const {
    isPending,
    error,
    data: blogPosts,
  } = useQuery({
    queryKey: ["recentBlogs"],
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
            : blogPosts.data.map((post) => (
                <BlogCard key={post._id} blogs={post} />
              ))}
        </div>
      </div>
      <NewsLetter />
    </>
  );
};

export default Home;
