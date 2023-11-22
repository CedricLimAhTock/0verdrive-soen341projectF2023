import React, { useState, useEffect } from "react";
import "./styles/Bookings.css";
import FormatNumber from "../FormatNumber/FormatNumber";
import axios from "axios";
const BuyerBookingCard = ({ data, expanded, toggleExpand }) => {
  const { status, client_id, broker_id, message } = data;
  const [user, setUser] = useState([]);
  const statusMap = {
    confirmed: "status-confirmed",
    hold: "status-hold",
    declined: "status-declined",
  };

  const statusName = statusMap[status] || "status-hold";
  function fetchUser() {
    axios
      .get(`http://localhost:8080/user/${broker_id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUser();
  }, []);
  const expand = () => {
    toggleExpand();
    console.log("expand");
  };
  return (
    <div className="whole-card" onClick={() => expand(event)}>
      <div className="buyer-booking-card">
        <div className="property-user">{user.username}</div>
        <div className={`property-status ${statusName}`}>{status}</div>
        <div className="property-email">{user.email}</div>
        <div className="property-message">{message}</div>
        {/* Date probably */}
      </div>
      {expanded && (
        <div className="expanded-content">
          <h1>Expanded Content</h1>
        </div>
      )}
    </div>
  );
};

export default BuyerBookingCard;
