import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const localStorageToken = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Check if localStorageToken exists and has a valid token
  if (localStorageToken && localStorageToken.token) {
    return children;
  } else {
    return <Navigate to="/" replace={true} />;
  }
};
