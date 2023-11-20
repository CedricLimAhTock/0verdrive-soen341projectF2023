import React, { useState, useEffect } from "react";
import axios from "axios";
import BuyerBookingCard from "./BuyerBookingCard";
import "./styles/Bookings.css";
import jwt_decode from "jwt-decode";

const Bookings = ({ data, token }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [bookingData, setBookingMade] = useState([]);

  const toggleExpand = (index) => {
    console.log("expand1");
    if (index === expandedCard) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwtToken");
      const decodedToken = jwt_decode(token);
      const brokerID = decodedToken.broker_id;

      try {
        const response = await axios.get(
          `http://localhost:8080/visit/client/${decodedToken.id}}`
        );
        setBookingMade(response.data);
        console.log(response.data);
        for (const [key, value] of Object.entries(bookingData)) {
          console.log(`${key}: ${value}`);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bookings">
      <div className="booking-header">
        <div className="header-type">User</div>
        <div className="header-status">Status</div>
        <div className="header-address">Email</div>
        <div className="header-broker">Phone</div>
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
