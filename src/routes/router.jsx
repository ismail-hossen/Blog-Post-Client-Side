import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Not found!</h1>,
    children: [
      { index: true, element: <h1>something...</h1> },
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
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
