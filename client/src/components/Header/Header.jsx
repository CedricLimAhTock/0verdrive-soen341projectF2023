import React from "react";
import  {NavLink } from 'react-router-dom';
import "./Header.css";
import darkToggle from "./assets/darkToggle.svg";
import bulb from "./assets/bulb.svg";
import hamburgerMenu from "./assets/hamburgerMenu.svg";
export default function Header() {
  return (
    <div className="header">
      <NavLink to="/" className="logo">Lorem Ipsum</NavLink>
      <div className="nav">
        <button className="home">HOME</button>
        <button className="browse">BROWSE</button>
        <button className="dashboard">DASHBOARD</button>
      </div>
      <div className="buttons">
        <img className="darkToggle" src={darkToggle} />
        <img className="bulb" src={bulb} />
        <img className="hamburgerMenu" src={hamburgerMenu} />
      </div>
    </div>
  );
}
