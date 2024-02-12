import logo from "@/assets/images/logo.svg";
import MoonIcon from "../MoonIcon/MoonIcon";
import SearchBar from "../SearchBar/SearchBar";
import "./AppHeader.css";
import { useState, useEffect } from "react";
const AppHeader = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setDarkMode(true);
      document.documentElement.classList.add("dark-mode");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark-mode");
    }
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value;
    if (font === "mono") {
      document.documentElement.classList.remove("serif");
      document.documentElement.classList.remove("san-serif");
      document.documentElement.classList.add("mono");
    }
    if (font === "serif") {
      document.documentElement.classList.remove("mono");
      document.documentElement.classList.remove("san-serif");
      document.documentElement.classList.add("serif");
    }
    if (font === "sans") {
      document.documentElement.classList.remove("mono");
      document.documentElement.classList.remove("serif");
      document.documentElement.classList.add("san-serif");
    }
  };

  useEffect(() => {
    // Execute handleFontChange when component mounts
    console.log("Component mounted");
    handleFontChange({
      target: { value: "mono" },
    } as React.ChangeEvent<HTMLSelectElement>);
  }, []);

  return (
    <>
      <header className="page-header">
        <img src={logo} height={"32px"} width={"32px"} />
        <div className="header-selectors">
          <select
            className={darkMode ? "dark-select" : ""}
            onChange={handleFontChange}
          >
            <option value="mono">Mono</option>
            <option value="serif">Serif</option>
            <option value="sans">Sans Serif</option>
          </select>
          <div className="line"></div>
          <label className="switch">
            <input type="checkbox" onChange={handleDarkMode} />
            <span className="slider round"></span>
          </label>
          <MoonIcon className={!darkMode ? "moon-light" : "moon-dark"} />
        </div>
      </header>
      <SearchBar darkMode={darkMode} />
    </>
  );
};
export default AppHeader;
