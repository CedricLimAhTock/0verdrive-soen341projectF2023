import React, { useState, useEffect } from "react";
import "./styles/DashboardOffers.css";
import axios from "axios";
const MessageCard = ({ messageInfo, expanded, toggleExpand }) => {
  const expand = () => {
    toggleExpand();
    console.log("expand");
  };
  const [message, setMessage] = useState("");
  const [parent_id, setParentId] = useState("");
  const [user_id, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const fetchUsername = () => {
    axios
      .get(`http://localhost:8080/user/${messageInfo.parent_id}`)
      .then((response) => {
        setUserName(response.data.username);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };
  useEffect(() => {
    setMessage(messageInfo.message || "");
    setParentId(messageInfo.parent_id || "");
    setUserId(messageInfo.user_id || "");
    fetchUsername();
  }, [messageInfo]);
  return (
    <div className="whole-card" onClick={() => expand()}>
      <div className="offer-card">
        <div className="property-broker">{userName}</div>
        <div className="property-address">
          {message.length > 100 ? message.slice(0, 100) + "..." : message}
        </div>
        {/* Additional details can be added here, such as date, deed, etc. */}
      </div>
      {expanded && (
        <div className="expanded-content">
          {/* You can display additional information when expanded */}
          <h1>{message}</h1>
        </div>
      )}
    </div>
  );
};

export default MessageCard;
