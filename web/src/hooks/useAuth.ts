import { useState } from "react";
import { API_URL } from "../service/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    console.log(API_URL + "/users/login");
    const res = await fetch(API_URL + "/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log(res);
    setIsAuthenticated(true);
    // setRole(role);
    // reject();
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
