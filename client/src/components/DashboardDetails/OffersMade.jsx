import React, { useState, useEffect } from "react";
import axios from "axios";
import OfferCard from "./OfferCard";
import "./styles/DashboardOffers.css";
import jwt_decode from "jwt-decode";

const OffersMade = () => {
  const [offerData, setOfferData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const mockData = [
      {
        type: "Type A",
        status: "Confirmed",
        address: "123 Mock St",
        price: "$550,000",
        broker: "Broker X",
      },
      {
        type: "Type B",
        status: "Hold",
        address: "456 Test St",
        price: "$620,000",
        broker: "Broker Y",
      },
      {
        type: "Type C",
        status: "Declined",
        address: "789 Example St",
        price: "$750,000",
        broker: "Broker Z",
      },
    ];

    setOfferData(mockData);

    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    axios
      .get(`http://localhost:8080/offer/user/${userId}/made`)
      .then((response) => {
        setOfferData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });

    // axios
    //   .get(`http://localhost:8080/offer/user/${userId}`)
    //   .then((response) => {
    //     setOfferData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching offers:", error);
    //   });
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
        <div className="offer-header-type">Type</div>
        <div className="offer-header-status">Status</div>
        <div className="offer-header-address">Address</div>
        <div className="offer-header-price">Price</div>
        <div className="offer-header-broker">Broker</div>
      </div>

      <div className="offer-cards">
        {offerData.map((offer, index) => (
          <OfferCard
            key={index}
            data={offer}
            expanded={index === expandedCard}
            toggleExpand={() => toggleExpand(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default OffersMade;
