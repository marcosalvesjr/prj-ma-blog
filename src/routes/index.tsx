import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import DefaultLayout from "@/layouts/DefaultLayout";
import { ProtectedRoute } from "./protectedRoute";
import PublicRoute from "./publicRoute";
import NewPost from "@/pages/NewPost";
import Register from "@/pages/Register";
import PostEdit from "@/pages/PostEdit";

export const router = createBrowserRouter([
  {
    // Mudança: Deixamos o layout sem path fixo para ele não "roubar" as outras rotas
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:slug",
        element: <PostDetail />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/new-post", // Definido explicitamente com a barra
            element: <NewPost />,
          },
          {
            path: "/edit-post/:slug",
            element: <PostEdit />,
          }
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
