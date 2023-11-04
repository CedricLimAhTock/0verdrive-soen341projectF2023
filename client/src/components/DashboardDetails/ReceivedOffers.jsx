import React, { useState, useEffect } from "react";
import OfferCard from "./OfferCard";
import "./styles/DashboardOffers.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

const ReceivedOffers = () => {
  const [offerData, setOfferData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    // Mock data for testing
    const mockData = [
      {
        type: "Type 1",
        status: "Confirmed",
        address: "123 Main St",
        price: "$500,000",
        broker: "Broker 1",
      },
      {
        type: "Type 2",
        status: "Hold",
        address: "456 Elm St",
        price: "$600,000",
        broker: "Broker 2",
      },
      {
        type: "Type 3",
        status: "Declined",
        address: "789 Oak St",
        price: "$700,000",
        broker: "Broker 3",
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

export default ReceivedOffers;
