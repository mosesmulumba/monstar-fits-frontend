"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { api, getToken } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) return setLoading(false);
    api("/api/auth/me")
      .then((d) => setUser(d.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const d = await api("/api/auth/login", {
      method: "POST", body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("token", d.token);
    setUser(d.user);
  };

  const register = async (email, password, name) => {
    const d = await api("/api/auth/register", {
      method: "POST", body: JSON.stringify({ email, password, name }),
    });
    localStorage.setItem("token", d.token);
    setUser(d.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);