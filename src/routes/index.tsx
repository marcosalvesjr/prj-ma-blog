import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import DefaultLayout from "@/layouts/DefaultLayout";
import { ProtectedRoute } from "./protectedRoute";
import PublicRoute from "./publicRoute";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/post/:slug", // O ':' indica que o 'slug' é um parâmetro dinâmico
            element: <PostDetail />,
          },
        ],
      },
    ],
  },

  {
    element: <PublicRoute />,
    children: [{ path: "/login", element: <Login /> }],
  },
]);
