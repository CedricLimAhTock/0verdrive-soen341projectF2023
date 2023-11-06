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
    first_name,
    last_name,
    id,
    user,
  } = broker;

  return (
    <div className="brokerCard">
      <div className="profile">
        <img src={profileIcon} className="profilepic" />
      </div>
      <div className="info">
        <div className="name">
          {user.firstname} {user.lastname}
        </div>
        <div className="agency">{agency}</div>
        <div className="email">{email}</div>
      </div>
    </div>
  );
};

export default BrokerCard;
