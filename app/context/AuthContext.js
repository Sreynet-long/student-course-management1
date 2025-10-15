"use client";
import { createContext, useState, useEffect, useContext } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [alert, setAlertState] = useState({
    open: false,
    status: "",
    message: { messageKh: "", messageEn: "" },
  });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Failed to load user from localStorage:", err);
    }
  }, []);

  const login = (userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      console.error("Failed to save user to localStorage:", err);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Failed to remove user from localStorage:", err);
    }
    setUser(null);
  };

  const setAlert = (open = true, status = "", message = { messageKh: "", messageEn: "" }, duration = 3000) => {
    setAlertState({ open, status, message });

    if (open) {
      setTimeout(() => {
        setAlertState({ open: false, status: "", message: { messageKh: "", messageEn: "" } });
      }, duration);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, alert, setAlert }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
