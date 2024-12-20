import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import AllPosts from "../pages/Home/AllPosts";
import MyPosts from "../pages/Home/MyPosts";
import LearnMore from "../pages/Home/LearnMore";
import Login from "../pages/Home/Login";
import Register from "../pages/Home/Register";
import PostBlog from "../pages/Home/PostBlog";
import PrivateRoute from "./PrivateRoute";
import ManageUser from "../pages/Home/ManageUser";
import ManageAllPost from "../pages/Home/ManageAllPost";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-posts",
        element: <AllPosts />,
      },
      {
        path: "/my-posts",
        element: <PrivateRoute><MyPosts /></PrivateRoute>,
      },
      {
        path: "/learn-more",
        element: <LearnMore />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user",
        element: <ManageUser />,
      },
      {
        path: "/post",
        element: <ManageAllPost />,
      },
      {
        path: "/post-blog",
        element: <PostBlog />,
      },
    ],
  },
]);
