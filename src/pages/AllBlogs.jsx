import { useQuery } from "@tanstack/react-query";
import BlogCard from "../components/home/BlogCard";
import useAxios from "../hooks/useAxios";
import { Input, Select } from "antd";
import { useState } from "react";
import { Option } from "antd/es/mentions";

const AllBlogs = () => {
  const axios = useAxios();
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isPending,
    error,
    data: blogPosts,
  } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const data = await axios.get("/all-blogs");
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

  const filteredBlogs = blogPosts?.data?.filter((blog) => {
    if (category === "All" || blog.category === category) {
      return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div className="container mx-auto p-4">
      <div>
        <div className="my-4 flex items-center space-x-4">
          <Select
            id="category"
            name="category"
            value={category}
            style={{ width: 150 }}
            onChange={setCategory}
          >
            <Option value="All">All Categories</Option>
            {blogPosts.data.map((blog, idx) => (
              <option key={idx} value={blog.category}>
                {blog.category}
              </option>
            ))}
          </Select>
          <Input
            placeholder="Search by Title"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {content
          ? content
          : filteredBlogs.map((post) => (
              <BlogCard key={post._id} blogs={post} />
            ))}
      </div>
    </div>
  );
};

export default AllBlogs;
