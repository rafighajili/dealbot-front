import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";

const RequireAuth = ({ allowedRole }) => {
  const { auth } = useAuth();
  const role = jwtDecode(auth.accessToken).role;

  return allowedRole == role ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/" />
  );
};

export default RequireAuth;
