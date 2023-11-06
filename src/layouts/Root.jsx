import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import BlogFooter from "../components/Shared/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-[1400px] mx-auto">
        <Outlet />
      </div>
      <BlogFooter />
    </div>
  );
};

export default Root;
