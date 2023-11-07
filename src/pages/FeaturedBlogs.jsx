import "ka-table/style.css";
import { useState } from "react";
import { kaReducer, Table } from "ka-table";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const FeaturedBlogs = () => {
  const axios = useAxios();
  const { data: featuredBlogs, isPending } = useQuery({
    queryKey: ["featuredBlog"],
    queryFn: async () => {
      const blog = await axios.get("/featured-blogs");
      return blog;
    },
  });

  // data for ka-table
  const dataArray = featuredBlogs?.data?.map((b, index) => ({
    column1: index + 1,
    column2: b.title,
    column3: b.author,
    id: index,
  }));

  // initial value of the *props
  const tablePropsInit = {
    columns: [
      { key: "column1", title: "Serial", dataType: DataType.String },
      { key: "column2", title: "Title", dataType: DataType.String },
      { key: "column3", title: "Owner", dataType: DataType.String },
    ],
    data: dataArray,
    editingMode: EditingMode.Cell,
    rowKeyField: "id",
    sortingMode: SortingMode.Single,
  };

  // in this case *props are stored in the state of parent component
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch = (action) => {
    // dispatch has an *action as an argument
    // *kaReducer returns new *props according to previous state and *action, and saves new props to the state
    changeTableProps((prevState) => kaReducer(prevState, action));
  };

  return (
    <>
      {isPending ? (
        <h1>loading</h1>
      ) : (
        <Table
          {...tableProps} // ka-table UI is rendered according to props
          dispatch={dispatch} // dispatch is required for obtain new actions from the UI
        />
      )}
    </>
  );
};

export default FeaturedBlogs;
