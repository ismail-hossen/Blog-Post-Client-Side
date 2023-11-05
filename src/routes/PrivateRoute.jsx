import { useContext } from "react";
import { ThemeContext } from "../authContext/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(ThemeContext);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!loading && !user) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
