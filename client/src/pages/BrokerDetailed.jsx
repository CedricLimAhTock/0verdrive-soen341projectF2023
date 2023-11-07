import React from "react";
import BrokerDetailedCard from "../components/BrokerDetailedCard/BrokerDetailedCard";
import { useLocation } from "react-router-dom";

const BrokerDetailed = (decodedToken) => {
  const location = useLocation();
  const broker = location.state.broker;

  return (
    <div>
      <BrokerDetailedCard broker={broker} token={decodedToken} />
    </div>
  );
};

export default BrokerDetailed;
