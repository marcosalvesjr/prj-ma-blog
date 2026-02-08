// 1. Importamos a função que cria o roteador
import { createBrowserRouter } from "react-router-dom";

// 2. Importamos as suas páginas (ajuste o caminho se necessário)
import Home from "../pages/Home";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import DefaultLayout from "@/layouts/DefaultLayout";
import { ProtectedRoute } from "./protectedRoute";

// 3. Criamos a configuração das rotas
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
    path: "/login",
    element: <Login />,
  },
]);
