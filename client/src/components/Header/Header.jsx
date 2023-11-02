import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import darkToggle from "./assets/darkToggle.svg";
import bulb from "./assets/bulb.svg";
import hamburgerMenu from "./assets/hamburgerMenu.svg";
import menuClose from "./assets/menu-close.svg";
import {HiMiniBars3} from "react-icons/hi2"
import {LiaTimesSolid} from "react-icons/lia"

export default function Header({ decodedToken }) {
  const displayUsername = decodedToken ? decodedToken.username : "Guest!";
  const [click, setClick] = useState(false)
  const handleClick = () => {
    setClick(!click)
  }
  const closeMenu = () => setClick(false)

  return (
    <div className="header">
      <NavLink to="/" className="name" > 
        Lorem Ipsum
      </NavLink>
      <div className="nav">
        <NavLink to="/" className="nav-item">
          HOME
        </NavLink>
        <NavLink to="/browse" className="nav-item">
          BROWSE
        </NavLink>
        {decodedToken ? (
          <NavLink to="/dashboard" className="nav-item">
            DASHBOARD
          </NavLink>
        ) : (
          <NavLink to="/signin" className="nav-item">
            DASHBOARD
          </NavLink>
        )}
      </div>
      <div className="buttons">
        {/* <img className="darkToggle" src={darkToggle} alt="Dark Toggle" />
        <img className="bulb" src={bulb} alt="Bulb" />
        <img className="hamburgerMenu" src={hamburgerMenu} alt="Hamburger Menu" /> */}
        <div className="username-display">Hello, {displayUsername}</div>
       
        <div className="menu-icon" onClick={handleClick}>
        {click ? <LiaTimesSolid /> : <HiMiniBars3 />}
          <div className={click ? "menu-items active" : "menu-items"} >
            {decodedToken ? (
              <NavLink to="/signout" className="menu-item">
                Sign Out
              </NavLink>
            ) : (
              <NavLink to="/signin" className="menu-item">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
