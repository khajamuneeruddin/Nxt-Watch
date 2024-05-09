import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const cookie = Cookies.get("jwt_Token");

  switch (cookie) {
    case undefined:
      return <Navigate to="/login" />;
    
    default:
      return children;
  }
};

export default ProtectedRoute;
