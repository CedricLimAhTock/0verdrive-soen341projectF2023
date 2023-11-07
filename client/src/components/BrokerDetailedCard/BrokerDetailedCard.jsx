import React, { useState, useEffect } from "react";

import "./BrokerDetailedCard.css";

import jwt_decode from "jwt-decode";

const BrokerDetailedCard = ({ broker }) => {
  const { firstname, lastname, email, phone, agency, id } = broker;

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
  const name = { firstname } + { lastname };

  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="details">
      <div className="left-side">
        <div className="info">
          <h2 className="title">{agency}</h2>
          <p className="address">{email}</p>
        </div>

        <div className="tabs">
          <div className="property-tabs">
            <button
              className={activeTab === "description" ? "active-tab" : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={activeTab === "broker" ? "active-tab" : ""}
              onClick={() => setActiveTab("broker")}
            >
              Broker
            </button>
            <button
              className={activeTab === "map" ? "active-tab" : ""}
              onClick={() => setActiveTab("map")}
            >
              Map
            </button>
          </div>
          <div className="property-details">
            {activeTab === "description" && <p>{description}</p>}
            {activeTab === "broker" && <p>{broker}</p>}
            {activeTab === "map" && <p>{description}</p>}
          </div>
        </div>
      </div>

      <div className="right-side"></div>
    </div>
  );
};

export default BrokerDetailedCard;
