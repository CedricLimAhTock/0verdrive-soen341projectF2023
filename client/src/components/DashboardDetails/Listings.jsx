import React, { useDebugValue, useEffect, useState } from "react";
import PropertyListingCard from "./PropertyListingCard";
import PropertyForm from "./PropertyForm";
import "./styles/Listings.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import PropertyAddForm from "./PropertyAddForm";
const Listings = ({ token }) => {
  // const data = [
  //   {
  //     type: "House",
  //     name: "Home sweet home",
  //     address: "1234 Main St, San Diego, CA 92101",
  //     price: "$1,000,000",
  //     image: "https://images.unsplash.com/photo-1560184897-ae8a57b4c1f4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "HAHAHA@lo.com"
  //   },
  //   {
  //     type: "Apartment",
  //     name: "One mansion",
  //     address: "New York City, New York, U.S",
  //     price: "$67,000,000",
  //     image: "https://images.unsplash.com/photo-1560184897-ae8a57b4c1f4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "IRanOutOfMail@idk.com"
  //   }
  // ];

  const [data, setData] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedPropertyData, setSelectedPropertyData] = useState(null);
  const [listings, setListings] = useState([]);
  const [addingProperty, setAddingProperty] = useState(false);

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
    setFormOpen(true);
  };

  const addProperty = () => {
    setAddingProperty(true);
    setFormOpen(false);
  };

  const handleAddProperty = (newProperty) => {
    //Add to send new property data server
    console.log("New Property Data:", newProperty);
    // API call to add new property

    setAddingProperty(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decoded = jwtDecode(token);
    const brokerId = decoded.broker_id;
    axios
      .get(`http://localhost:8080/listing/broker/${brokerId}`)
      .then((res) => {
        setListings(res.data);
      })
      .catch((error) => {
        console.log("Error in profile.jsx: ", error);
      });
  }, []);

  const closeForm = () => {
    setFormOpen(false);
  };

  return (
    <div className="listings">
      <div className="properties-header">
        <div className="header-property-type">Type</div>
        <div className="header-property-name">Name</div>
        <div className="header-property-address">Address</div>
        <div className="header-property-price">Price</div>
        <div className="property-intro-right">
          Total: {data.length}
          <button className="add-property-button" onClick={addProperty}>
            Add
          </button>
        </div>
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
          onAddProperty={handleAddProperty}
        />
      )}
    </div>
  );
};

export default Listings;
