import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import MyBookPage from "./pages/MyBookPage";
import DetailBookPage from "./pages/DetailBookPage";
import MyBookStatus from "./pages/MyBookStatus";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      loader: () => {
        if (localStorage.getItem("token")) {
          return redirect("/");
        }
        return null;
      },
    },
    {
      path: "/register",
      element: <Register />,
      loader: () => {
        if (localStorage.getItem("token")) {
          return redirect("/");
        }
        return null;
      },
    },
    {
      element: <MainLayout />,
      loader: () => {
        if (!localStorage.getItem("token")) {
          return redirect("/login");
        }
        return null;
      },
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/mybooks",
          element: <MyBookPage />,
        },
        {
          path: "/books/:id",
          element: <DetailBookPage />,
        },
        {
          path: "/mybooks/:id",
          element: <MyBookStatus />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
