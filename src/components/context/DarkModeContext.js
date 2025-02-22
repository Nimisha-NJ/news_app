import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const DarkModeContext = createContext();

// Provider Component
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      const storedTheme = localStorage.getItem("theme");
      setDarkMode(storedTheme === "dark");
    }, []);
    

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom Hook for easy access
export const useDarkMode = () => useContext(DarkModeContext);
