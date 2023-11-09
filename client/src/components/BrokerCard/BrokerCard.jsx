import React, { useState } from "react";
import "./BrokerCard.css";
import profileIcon from "../../assets/profile-picture.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrokerCard = ({ broker, decodedToken }) => {
  const navigate = useNavigate();
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

  const onEventClick = async (brokerId) => {
    console.log("brokerId", brokerId);
    const currentBroker = async () => {
      const response = await axios.get(
        `http://localhost:8080/broker/${brokerId}`
      );
      return response.data;
    };

    const brokerData = await currentBroker();
    if (brokerData) {
      window.scrollTo(0, 0);
      navigate(`/broker/${brokerId}`, {
        state: { broker: brokerData },
      });
    }
  };

  return (
    <div className="brokerCard" onClick={() => onEventClick(broker.id)}>
      <div className="profile-broker">
        <img src={profileIcon} className="profilepic" />
        <div className="info">
          <div className="name">
            {user.firstname} {user.lastname}
          </div>
          <div className="agency">{agency}</div>
          <div className="email">{email}</div>
        </div>
      </div>
    </div>
  );
};

export default BrokerCard;
