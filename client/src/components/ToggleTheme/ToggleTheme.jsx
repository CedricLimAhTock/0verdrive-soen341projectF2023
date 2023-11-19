import React, { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import "./ToggleTheme.css"; // Assuming this file contains your dark mode styles

const ToggleTheme = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

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
