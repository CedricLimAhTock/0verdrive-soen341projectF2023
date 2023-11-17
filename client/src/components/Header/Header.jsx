import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Dropdown from "../Dropdown/Dropdown";
import jwt_decode from "jwt-decode";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

export default function Header() {
  const userToken = localStorage.getItem("jwtToken");
  const decodedToken = userToken ? jwt_decode(userToken) : null;
  const displayUsername = decodedToken ? decodedToken.username : "Guest";

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  const [dropdown, setDropdown] = useState(false);
  let timeoutId;

  const onMouseEnter = () => {
    setDropdown(true);
    clearTimeout(timeoutId);
  };

  const onMouseLeave = () => { 
    timeoutId = setTimeout(() => {
      setDropdown(false);
    }, 400);
  };

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
        <li
          className="nav-item"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavLink to="/Browse" className="nav-item">
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
        <div className="username-display">Hello, {displayUsername}</div>
        <ToggleTheme/>
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
