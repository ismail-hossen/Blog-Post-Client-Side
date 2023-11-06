import { useContext } from "react";
import { ThemeContext } from "../authContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(ThemeContext);
  const location = useLocation();

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!loading && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoute;
