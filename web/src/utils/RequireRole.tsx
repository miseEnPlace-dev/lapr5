import { useContext } from "react";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";

import AuthContext from "../context/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
  role: string;
}

export const RequireRole: React.FC<RequireAuthProps> = ({ children, role }) => {
  const { role: r } = useContext(AuthContext);

  if (!r) swal("Error", "You are not able to access this page", "error");

  return r === role ? children : <Navigate to="/login" replace />;
};
