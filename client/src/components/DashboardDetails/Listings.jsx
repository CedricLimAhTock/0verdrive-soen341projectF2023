import React, { useDebugValue, useEffect, useState } from "react";
import PropertyListingCard from "./PropertyListingCard";
import PropertyForm from "./PropertyForm";
import "./styles/Listings.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import PropertyAddForm from "./PropertyAddForm";

const Listings = ({ token }) => {
  const [data, setData] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedPropertyData, setSelectedPropertyData] = useState(null);
  const [addingProperty, setAddingProperty] = useState(false);

  // List of properties
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const brokerID = decodedToken.broker_id;

    const listings = async () => {
      const response = await axios.get(
        `http://localhost:8080/listing/broker/${brokerID}`
      );
      setData(response.data);
    };
    listings();
  }, []);

  const toggleExpand = (index) => {
    console.log("expand1");
    setSelectedPropertyData(data[index]);
  };

  useEffect(() => {
    if (selectedPropertyData) {
      console.log(selectedPropertyData);
      setFormOpen(true);
    }
  }, [selectedPropertyData]);

  const addProperty = () => {
    setAddingProperty(true);
    setFormOpen(false);
  };


  const closeForm = () => {
    setFormOpen(false);
  };

  return (
    <div className="listings">
      <div className="listing-header">
        <h2>All Properties</h2>
      <div className="property-intro-right">
          <p>Total: {data.length}</p>
          <button className="add-property-button" onClick={addProperty}>
            Add
          </button>
        </div>
      </div>
      <div className="properties-header">
        <div className="header-property-type">Type</div>
        <div className="header-property-name">Title</div>
        <div className="header-property-address">Address</div>
        <div className="header-property-price">Price</div>

      </div>

      <div className="properties-cards">
        {data.map((userData, index) => (
          <PropertyListingCard
            key={index}
            data={userData}
            toggleExpand={() => toggleExpand(index)}
          />
        ))}
      </div>

      {isFormOpen && selectedPropertyData && (
        <PropertyForm
          isFormOpen={isFormOpen}
          closeForm={closeForm}
          data={selectedPropertyData}
        />
      )}

      {addingProperty && (
        <PropertyAddForm
          isFormOpen={addingProperty}
          closeForm={() => setAddingProperty(false)}
        />
      )}
    </div>
  );
};

export default Listings;
