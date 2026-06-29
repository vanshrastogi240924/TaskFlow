/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- LOGIN ----------------

  const login = async (email, password) => {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return false;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      setToken(data.token);
      setUser(data.user);

      return true;
    } catch (err) {
      console.error(err);
      setError("Server Error");
      return false;
    }
  };

  // ---------------- REGISTER ----------------

  const register = async (
    name,
    email,
    password
  ) => {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return false;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      setToken(data.token);
      setUser(data.user);

      return true;
    } catch (err) {
      console.error(err);
      setError("Server Error");
      return false;
    }
  };

  // ---------------- LOGOUT ----------------

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
    setError("");
  };

  // ---------------- LOAD USER ----------------

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          logout();
        } else {
          const data =
            await response.json();

          setUser(data);
        }
      } catch (err) {
        console.error(err);
        logout();
      }

      setLoading(false);
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};