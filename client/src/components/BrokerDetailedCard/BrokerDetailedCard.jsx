import React, { useState, useEffect } from "react";

import "./BrokerDetailedCard.css";

import jwt_decode from "jwt-decode";

const BrokerDetailedCard = ({ broker }) => {
  const { user, email, phone, agency, id } = broker;

  const { firstname, lastname } = user;

  const [decodedToken, setDecodedToken] = React.useState(null);
  useEffect(() => {
    function fetchData() {
      //const token = localStorage.getItem("jwtToken");
      const decoded = null;
      setDecodedToken(decoded);
    }

    fetchData();
  }, []);

  const description =
    "A hard working broker that strives to give the best and nothing less.";
  const name = firstname + " " + lastname;

  return (
    <div className="broker-details">
      <div className="broker-left-side">
        <div className="broker-info">
          <p className="broker-agency">{name}</p>
          <p className="broker-email">{email}</p>
          <p className="broker-desc">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetailedCard;
