import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import darkToggle from "./assets/darkToggle.svg";
import bulb from "./assets/bulb.svg";
import hamburgerMenu from "./assets/hamburgerMenu.svg";
import jwt_decode from "jwt-decode";

export default function Header() {
  const userToken = localStorage.getItem("jwtToken");
  const decodedToken = userToken ? jwt_decode(userToken) : null;
  const displayUsername = decodedToken ? decodedToken.username : "Guest";

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    alert("You have been signed out");
    window.location.reload();
  };

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
        {/* <img className="darkToggle" src={darkToggle} alt="Dark Toggle" />
        <img className="bulb" src={bulb} alt="Bulb" />
        <img className="hamburgerMenu" src={hamburgerMenu} alt="Hamburger Menu" /> */}
        <div className="username-display">Hello, {displayUsername}</div>
        <div className="headerMenu">
          <img
            className="hamburgerMenu"
            src={hamburgerMenu}
            alt="Hamburger Menu"
          />
          <div className="menuItems">
            {decodedToken ? (
              <NavLink to="/" className="menuItem" onClick={() => handleSignOut()}>
              SIGN OUT
            </NavLink>
            ) : (
              <NavLink to="/signin" className="menuItem">
                SIGN IN
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
