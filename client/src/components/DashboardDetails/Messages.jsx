import React, { useState, useEffect } from "react";
import OfferCard from "./OfferCard";
import "./styles/DashboardOffers.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Messages = () => {
  const [offerData, setOfferData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwt_decode(token);
    const brokerID = decodedToken.broker_id;

    axios
      .get(`http://localhost:8080/offer/broker/${brokerID}`)
      .then((response) => {
        setOfferData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, []);

  const toggleExpand = (index) => {
    if (index === expandedCard) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  return (
    <div className="offers">
      <div className="offer-header">
        <div className="offer-header-status">Status</div>
        <div className="offer-header-address">Address</div>
        <div className="offer-header-price">Price</div>
        <div className="offer-header-broker">Broker</div>
      </div>

      <div className="offer-cards">
        {offerData.length > 0 ? (
          offerData.map((offer, index) => (
            <div key={index} className="hehe">
              <OfferCard
                key={index}
                offer={offer}
                expanded={index === expandedCard}
                toggleExpand={() => toggleExpand(index)}
              />
            </div>
          ))
        ) : (
          <p className="no-offers">No offers received</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
