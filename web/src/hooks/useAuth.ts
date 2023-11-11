import { useState } from "react";
import api from "../service/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api("/users/login", {
      method: "POST",
      data: {
        email,
        password,
      },
    });

    if (res.status === 200) {
      setIsAuthenticated(true);
      setRole(res.data.userDTO.role);
      return Promise.resolve();
    } else {
      return Promise.reject(res.data.message);
    }
  };

  const logout = () => {
    return new Promise<void>((res) => {
      setIsAuthenticated(false);
      setRole(null);
      res();
    });
  };

  return {
    isAuthenticated,
    login,
    role,
    logout,
  };
}
