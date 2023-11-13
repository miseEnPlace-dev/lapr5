import { useEffect, useState } from "react";

import { localStorageConfig } from "../config/localStorageConfig";
import api from "../service/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(localStorageConfig.token) ? true : false
  );
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  async function getSession(token: string) {
    const res = await api("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      setIsAuthenticated(true);
      setRole(res.data.role);
      setUsername(`${res.data.firstName} ${res.data.lastName}`);
      return;
    }

    setIsAuthenticated(false);
    setRole(null);
    setUsername(null);
    localStorage.removeItem(localStorageConfig.token);
  }

  useEffect(() => {
    const token = localStorage.getItem(localStorageConfig.token);
    if (!token) return;

    getSession(token);
  }, []);

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
      setUsername(`${res.data.userDTO.firstName} ${res.data.userDTO.lastName}`);
      localStorage.setItem(localStorageConfig.token, res.data.token);
      return Promise.resolve();
    } else {
      return Promise.reject(res.data.message);
    }
  };

  const logout = () => {
    return new Promise<void>((res) => {
      setIsAuthenticated(false);
      setRole(null);
      localStorage.removeItem(localStorageConfig.token);
      res();
    });
  };

  return {
    isAuthenticated,
    login,
    role,
    username,
    logout,
  };
}
