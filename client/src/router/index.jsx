import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";

//TODO
const AuthLayout = () => {
  return <Outlet />;
};
export default createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Home />,
    path: "/home",
  },
]);
