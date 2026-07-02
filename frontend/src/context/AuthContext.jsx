import { createContext, useContext, useEffect, useState } from "react";
import API from "../api.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // LOAD USER FROM BACKEND ON START
  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) return;

      try {
        const res = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        setToken(storedToken);
        setUser(res.data.user);

        // Save user in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // LOGIN
  const login = (token, userData) => {
    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setToken(token);
    setUser(userData);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);