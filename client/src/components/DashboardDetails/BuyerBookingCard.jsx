import React, { useState, useEffect } from "react";
import "./styles/Bookings.css";
import FormatNumber from "../FormatNumber/FormatNumber";
import axios from "axios";
const BuyerBookingCard = ({ data, expanded, toggleExpand }) => {
  const { status, client_id, broker_id, message } = data;
  const [user, setUser] = useState([]);
  const statusMap = {
    booked: "status-confirmed",
    hold: "status-hold",
    denied: "status-declined",
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
  const ThreeButtonsFunc = (action) => {
    let choice = "";

    if (action === "book") {
      choice = "booked";
    } else if (action === "deny") {
      choice = "denied";
    } else if (action === "complete") {
      choice = "completed";
    }

    axios
      .put(`http://localhost:8080/visit/${data.id}`, {
        status: choice,
      })
      .then((response) => {
        console.log(response);
        alert("Status changed");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <div className="expanded-content three-buttons">
          <button
            className={`property-status status-book`}
            onClick={() => ThreeButtonsFunc("book")}
          >
            Book
          </button>
          <button
            className={`property-status status-declined`}
            onClick={() => ThreeButtonsFunc("deny")}
          >
            Deny
          </button>
          <button
            className={`property-status status-confirmed`}
            onClick={() => ThreeButtonsFunc("complete")}
          >
            Complete
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyerBookingCard;
