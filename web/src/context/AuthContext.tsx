import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        login: auth.login,
        logout: auth.logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
