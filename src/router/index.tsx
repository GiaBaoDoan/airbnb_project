import { RouteObject } from "react-router-dom";
import { AuthLayout } from "components/layouts";
import Login from "pages/Login";
import Register from "pages/Register";
import Account from "pages/Acount";
import { PATH } from "constant";
import Users from "pages/Admin/Users";
import Rooms from "pages/Rooms";
import { HomeAirbnb } from "pages";
import ListRoom from "pages/ListRoom";
import AddUsers from "pages/Admin/AddUsers";
import Location from "pages/Location";
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
  {
    path: PATH.admin,
    children: [
      {
        path: PATH.adduser,
        element: <AddUsers />,
      },
      {
        path: PATH.users,
        element: <Users />,
      },
      {
        path: "/admin/location",
        element: <Location />,
      },
      {
        path: "/admin/rooms",
        element: <Rooms />,
      },
    ],
  },
];
