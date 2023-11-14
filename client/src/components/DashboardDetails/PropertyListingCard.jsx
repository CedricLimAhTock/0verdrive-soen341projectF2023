import React, { useState, useEffect } from "react";
import axios from "axios";
import FormatNumber from "../FormatNumber/FormatNumber";
const PropertyListingCard = ({ data, expanded, toggleExpand }) => {
  const { property_id, title } = data;
  const [property, setProperty] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await axios.get(
        `http://localhost:8080/property/${property_id}`
      );
      setProperty(response.data);
    };

    fetchProperty();
  }, [property_id]);

  const {
    property_type,
    price,
    civic_address,
    apt_number,
    street,
    city,
    province,
    country,
  } = property;
  const address = `${civic_address}-${apt_number}, ${street}, ${city}, ${province}, ${country}`;
  const expand = () => {
    toggleExpand();
    console.log("expand");
  };

  return (
    <div className="property-listing-card" onClick={expand}>
      <div className="property-detail-card">
        <div className="property-type">{property_type}</div>
        <div className="property-name">{title}</div>
        <div className="property-address">{address}</div>
        <div className="property-price">${FormatNumber(price)}</div>
        {/* <div className="property-image">{image}</div> */}
      </div>
    </div>
  );
};

export default PropertyListingCard;
