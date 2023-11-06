import React, { useState } from "react";
import "./BrokerCard.css";
import profileIcon from "../../assets/profile-picture.png";
import axios from "axios";

const BrokerCard = ({ broker, onEventClick, decodedToken }) => {
  const {
    active,
    user_id,
    licence_number,
    agency,
    email,
    phone,
    firstname,
    lastname,
    id,
  } = broker;

  return (
    <div className="brokerCard">
      <div className="profilepic">
        <img src={profileIcon} className="profile" />
      </div>
      <div className="info">
        <div className="name">
          {firstname} {lastname}
        </div>
        <div className="agency">{agency}</div>
        <div className="email">{email}</div>
      </div>
    </div>
  );
};

export default BrokerCard;
