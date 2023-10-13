import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import darkToggle from "./assets/darkToggle.svg";
import bulb from "./assets/bulb.svg";
import hamburgerMenu from "./assets/hamburgerMenu.svg";
export default function Header() {
  return (
    <div className="header">
      <NavLink to="/" className="name">
        Lorem Ipsum
      </NavLink>
      <div className="nav">
        <NavLink className="nav-item">HOME</NavLink>
        <NavLink to="/browse" className="nav-item">
          BROWSE
        </NavLink>
        <NavLink className="nav-item">DASHBOARD</NavLink>
      </div>
      <div className="buttons">
        <img className="darkToggle" src={darkToggle} />
        <img className="bulb" src={bulb} />
        <img className="hamburgerMenu" src={hamburgerMenu} />
      </div>
    </div>
  );
}
