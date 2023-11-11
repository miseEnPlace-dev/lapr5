import { useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    return new Promise<void>((res) => {
      setIsAuthenticated(true);
      res();
    });
  };

  const logout = () => {
    return new Promise<void>((res) => {
      setIsAuthenticated(false);
      res();
    });
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}
