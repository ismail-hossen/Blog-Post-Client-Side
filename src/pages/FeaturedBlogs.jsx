import DataTable from "react-data-table-component";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturedBlogs = () => {
  const axios = useAxios();
  const { data: featuredBlogs, isPending } = useQuery({
    queryKey: ["featuredBlog"],
    queryFn: async () => {
      const blog = await axios.get("/featured-blogs");
      return blog;
    },
  });

  const data = featuredBlogs?.data?.map((b, idx) => ({
    id: idx + 1,
    title: b.title,
    owner: b.author,
    profile: b?.profile,
  }));

  const columns = [
    {
      name: "Serial",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Blog owner",
      selector: (row) => row.owner,
      sortable: true,
    },
    {
      name: "Profile",
      selector: (row) => row.profile,
      cell: (row) => {
        return (
          <Avatar
            size={{ xs: 20, sm: 28, md: 40, lg: 55, xl: 65, xxl: 90 }}
            icon={<AntDesignOutlined />}
            src={row.profile}
          />
        );
      },
    },
  ];

  return (
    <>
      {isPending ? (
        <div className="container my-16 mx-auto">
          <Skeleton
            className="text-3xl font-semibold mb-4"
            height={40}
            count={1}
            width={200}
          />
          <Skeleton height={50} count={1} />
          <div className="flex w-full justify-between">
            <Skeleton height={40} width={190} count={10} />
            <Skeleton height={40} width={400} count={10} />
            <Skeleton height={40} width={300} count={10} />
            <Skeleton height={40} width={150} count={10} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto my-16">
          <h2 className="text-3xl font-semibold mb-4">Featured Blogs</h2>
          <DataTable columns={columns} data={data}></DataTable>
        </div>
      )}
    </>
  );
};

export default FeaturedBlogs;
