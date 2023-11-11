import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
}) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ path: location.pathname }}
    />
  );
};
