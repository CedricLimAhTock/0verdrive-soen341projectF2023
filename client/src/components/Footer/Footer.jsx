import React from "react"
import "./Footer.css";
import Overdrive from "./assets/Overdrive.svg";

const Footer = () => {
  return (
    <div className = "footer">
        <div className = "footer_logo">Lorem Ipsum</div>
        <img className = "overdrive" src={Overdrive}/>
    </div>
  )
}

export default Footer