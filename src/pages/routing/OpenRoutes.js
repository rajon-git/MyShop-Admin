import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const localStorageToken = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Check if localStorageToken exists and has a valid token
  if (localStorageToken && localStorageToken?.token) {
    // If the user is authenticated, redirect them away from these routes
    return <Navigate to="/admin" replace={true} />;
  } else {
    // If the user is not authenticated, render the children (i.e., allow access to these routes)
    return children;
  }
};
