import React, { useState, useEffect } from 'react';
import OfferCard from './OfferCard';
import './styles/DashboardOffers.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const OffersMade = () => {
  const [offerData, setOfferData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);
      const brokerID = decodedToken.broker_id;

      try {
        const response = await axios.get(`http://localhost:8080/offer/maker/${brokerID}`);
        setOfferData(response.data);
        for (const [key, value] of Object.entries(offerData)) {
          console.log(`${key}: ${value}`);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
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
          <p className="no-offers">No offers</p>
        )}
      </div>
    </div>
  );
};

export default OffersMade;
