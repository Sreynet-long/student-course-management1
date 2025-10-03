"use client";
import { createContext, useState, useEffect } from "react"; // 🚨 Import useEffect 🚨

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // ==================== Alert Message State ======================
  const [open, setOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [messageAlert, setMessageAlert] = useState({
    messageKh: "",
    messageEn: "",
  });

  const setAlert = (open, alert, message) => {
    setOpen(open);
    setAlertStatus(alert);
    setMessageAlert(message);
  };

  const alert = () => {
    return { open: open, status: alertStatus, message: messageAlert };
  };
  
  // ==================== Language State ===============================
  // 1. Initialize with a safe default on the server.
  const [language, setLanguage] = useState("en"); 
  
  // 2. Use useEffect to load stored language only on the client.
  useEffect(() => {
    // Check if running in a browser environment
    if (typeof window !== 'undefined' && window.localStorage.getItem("language")) {
      setLanguage(window.localStorage.getItem("language"));
    }
  }, []); // Run only once on mount to load initial state.
  
  // 3. Update 'changeLanguage' to also save to localStorage.
  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
        window.localStorage.setItem("language", lang); 
    }
  };

  // The now-obsolete handleGetLanguage function is removed.

  const value = {
    alert,
    setAlert,
    changeLanguage,
    language,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };