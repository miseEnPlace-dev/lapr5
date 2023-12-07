import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";

import { localStorageConfig } from "@/config/localStorageConfig";

import AuthContext from "../context/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
  role: string;
}

export const RequireRole: React.FC<RequireAuthProps> = ({ children, role }) => {
  const { role: r } = useContext(AuthContext);

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(localStorageConfig.token)) setIsValid(false);
    if (r && r !== role) setIsValid(false);
  }, [r, role]);

  if (!isValid) swal("Error", "You are not able to access this page", "error");

  return isValid ? children : <Navigate to="/login" replace />;
};
