import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicRoute from "./PublicRoute";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Not found!</h1>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/add-blog",
        element: (
          <PrivateRoute>
            <h1>from add blog</h1>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
]);

export default router;
