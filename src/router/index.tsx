import { RouteObject } from "react-router-dom";
import { AuthLayout } from "components/layouts";
import Login from "pages/Login";
import Register from "pages/Register";
import Account from "pages/Acount";
import { HomeAirbnb } from "pages";
import ListRoom from "pages/ListRoom";
import MainLayOut from "components/layouts/MainLayout";
import ResultPage from "pages/ResultPage";
import AirBnbDetail from "pages/AirBnbDetail";
export const router: RouteObject[] = [
  {
    element: <AuthLayout />,
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
  {
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: <HomeAirbnb />,
      },
      {
        path: "/listRoom/",
        element: <ListRoom />,
      },
      {
        path: "/detail/:id",
        element: <AirBnbDetail />,
      },
      {
        path: "/results/:id",
        element: <ResultPage />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
];
