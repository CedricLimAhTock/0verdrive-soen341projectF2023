import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import darkToggle from "./assets/darkToggle.svg";
import bulb from "./assets/bulb.svg";
import hamburgerMenu from "./assets/hamburgerMenu.svg";
import Dropdown from "../Dropdown/Dropdown";
import { HiMiniBars3 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import jwt_decode from "jwt-decode";

export default function Header() {
  const userToken = localStorage.getItem("jwtToken");
  const decodedToken = userToken ? jwt_decode(userToken) : null;
  const displayUsername = decodedToken ? decodedToken.username : "Guest";

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const closeMenu = () => setClick(false);
  const [dropdown, setDropdown] = useState(false);

  const onMouseEnter = () => {
    setDropdown(true);
  }

  const onMouseLaave = () => {
    setDropdown(false);
  }

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
      <ul className={click ? "nav active" : "nav"}>
          <li className="nav-item">
            <NavLink to="/" className="nav-item">
              HOME
            </NavLink>
          </li>
          <li className="nav-item" 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLaave}
          >
            <NavLink to = "/Browse" className="nav-item">
              SEARCH ▾
            </NavLink>
            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <NavLink to="/Dashboard" className="nav-item">
              DASHBOARD
            </NavLink>
          </li>
        </ul>
      <div className="buttons">
        {/* <img className="darkToggle" src={darkToggle} alt="Dark Toggle" />
        <img className="bulb" src={bulb} alt="Bulb" />
        <img className="hamburgerMenu" src={hamburgerMenu} alt="Hamburger Menu" /> */}
        <div className="username-display">Hello, {displayUsername}</div>
          <div className="signin-signout-button">
            {decodedToken ? (
              <a href="#" className="signin-signout" onClick={() => handleSignOut()}>
                Sign Out
              </a>
            ) : (
              <NavLink to="/signin" className="signin-signout">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </div>
  );
}
