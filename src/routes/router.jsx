import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Not found!</h1>,
    children: [{ path: "/", element: <h1>something...</h1> }],
  },
]);

export default router;
