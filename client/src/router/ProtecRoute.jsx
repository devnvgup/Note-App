import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtecRoute({ children }) {
  const navigate = useNavigate();
  if (!localStorage.getItem("accessToken")) {
    navigate("/login");
    return;
  }
  return <Outlet />;
}

export default ProtecRoute;
