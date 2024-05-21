import React, { useContext } from "react";
import { Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigation = useNavigate();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : navigation.navigate("/")
      }
    />
  );
};

export default ProtectedRoute;
