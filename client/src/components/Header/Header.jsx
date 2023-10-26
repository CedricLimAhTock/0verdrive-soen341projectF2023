import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import darkToggle from "./assets/darkToggle.svg";
import bulb from "./assets/bulb.svg";
import hamburgerMenu from "./assets/hamburgerMenu.svg";

export default function Header({ props }) {
  const displayUsername = props ? props.username : 'Test123';

  return (
    <div className="header">
      <NavLink to="/" className="name">
        Lorem Ipsum
      </NavLink>
      <div className="nav">
        <NavLink to="/" className="nav-item">
          HOME
        </NavLink>
        <NavLink to="/browse" className="nav-item">
          BROWSE
        </NavLink>
        <NavLink to="/dashboard" className="nav-item">
          DASHBOARD
        </NavLink>
      </div>
      <div className="buttons">
        <img className="darkToggle" src={darkToggle} alt="Dark Toggle" />
        <img className="bulb" src={bulb} alt="Bulb" />
        <img className="hamburgerMenu" src={hamburgerMenu} alt="Hamburger Menu" />
        <div className="username-display">{displayUsername}</div>
      </div>
    </div>
  );
}