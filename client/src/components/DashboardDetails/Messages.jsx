import React, { useState, useEffect } from "react";
import MessageCard from "./MessageCard";
import "./styles/DashboardOffers.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Messages = () => {
  const [messageData, setMessageData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwt_decode(token);
    const brokerID = decodedToken.id;

    axios
      .get(`http://localhost:8080/message/received/${brokerID}`)
      .then((response) => {
        setMessageData(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
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
        <div className="offer-header-status">From</div>
      </div>

      <div className="offer-cards">
        {messageData.length > 0 ? (
          messageData.map((message, index) => (
            <div key={index} className="hehe">
              <MessageCard
                key={index}
                messageInfo={message}
                expanded={index === expandedCard}
                toggleExpand={() => toggleExpand(index)}
              />
            </div>
          ))
        ) : (
          <p className="no-offers">No messages received</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
