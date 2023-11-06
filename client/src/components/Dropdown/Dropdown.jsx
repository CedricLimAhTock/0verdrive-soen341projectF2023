import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Dropdown.css";

const menuItems = [
  {
    title: "PROPERTIES",
    path: "/Browse",
    cName: "dropdown-link",
  },
  {
    title: "BROKERS",
    path: "/brokers",
    cName: "dropdown-link",
  },
];

const Dropdown = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <ul
      onClick={handleClick}
      className={click ? "dropdown-menu clicked" : "dropdown-menu"}
    >
      {menuItems.map((item, index) => {
        return (
          <li key={index}>
            <NavLink
              className={item.cName}
              to={item.path}
              onClick={() => setClick(false)}
            >
              {item.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default Dropdown;
