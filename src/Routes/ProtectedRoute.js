import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext, { getAuthToken } from "../context/auth-context";

const ProtectedRoute = () => {
  const authCtx = useContext(AuthContext);
  const result = getAuthToken();
  if (result == null) authCtx.logout();
  return <>{result !== null ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
