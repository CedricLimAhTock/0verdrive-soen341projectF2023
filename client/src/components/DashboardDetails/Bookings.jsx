import React, { useState, useEffect } from "react";
import axios from "axios";
import BuyerBookingCard from "./BuyerBookingCard";
import "./styles/Bookings.css";

const Bookings = ({ data }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (index) => {
    console.log("expand1");
    if (index === expandedCard) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const bookingData = [
    {
      type: "Apartment",
      status: "confirmed",
      address: "1234 Main St, San Diego, CA 92101",
      price: "$1,000,000",
      broker: "John Doe",
    },
    {
      type: "Home",
      status: "declined",
      address: "308 Negra Arroyo Lane, Albuquerque, New Mexico 87104",
      price: "$67,000,000",
      broker: "Ben Dover",
    },
    // Add more booking data as needed
  ];

  return (
    <div className="bookings">
      <div className="booking-header">
        <div className="header-type">Type</div>
        <div className="header-status">Status</div>
        <div className="header-address">Address</div>
        <div className="header-price">Price</div>
        <div className="header-broker">Broker</div>
      </div>

      <div className="booking-cards">
        {bookingData.map((data, index) => (
          <BuyerBookingCard
            key={index}
            data={data}
            expanded={index === expandedCard}
            toggleExpand={() => toggleExpand(index)}
          />
        ))}
      </div>
    </div>
  );
};
export default Bookings;
