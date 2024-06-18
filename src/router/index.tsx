import { RouteObject } from "react-router-dom";
import { AuthLayout } from "components/layouts";
import Login from "pages/Login";
import Register from "pages/Register";
import Account from "pages/Acount";
import { PATH } from "constant";
import Users from "pages/Admin/Users";
import Children from "pages/Children";
import Sidebar from "pages/SideBar";
import Posts from "pages/Post";
import Rooms from "pages/Rooms";
import { HomeAirbnb } from "pages";
import ListRoom from "pages/ListRoom";
import AddUsers from "pages/Admin/AddUsers";
import AirBnbDetail from "pages/airbnbDetail/AirBnbDetail";
import Location from "pages/Location";
import MainLayOut from "components/layouts/MainLayout";
import ResultPage from "pages/ResultPage";
export const router: RouteObject[] = [
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
    element: <Sidebar children={<Children />} />,
    children: [
      {
        path: "/admin/Post",
        element: <Posts />,
      },
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
  // {

  // {
  //   element: <HeaderListRoom />,
  //   children: [
  //     {
  //       path: "/ListRoom",
  //       element: <ListRoom />,
  //     },
  //     {
  //       path: "/ListRoom/:id",
  //       element: <ListRoom />,
  //     },
  //   ],
  // },
  // {
  //   path: "*",
  //   element: <Notfound />,
  // },
];
