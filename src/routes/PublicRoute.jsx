import { useContext } from "react";
import { ThemeContext } from "../authContext/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(ThemeContext);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!loading && user?.email) {
    return <Navigate to="/" replace></Navigate>;
  }

  return children;
};

export default PublicRoute;
