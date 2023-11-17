import React, { useState, useEffect } from "react";
import "./ToggleTheme.css"; // Assuming this file contains your dark mode styles

const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <input
      type="checkbox"
      id="toggle"
      checked={darkMode}
      onChange={toggleDarkMode}
    />
  );
};

export default ToggleTheme;
