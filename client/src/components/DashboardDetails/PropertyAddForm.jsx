import React, { useState, useRef } from "react";
import "./styles/PropertyAddForm.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import xIcon from "../../assets/xIcon.svg";

const PropertyAddForm = ({ isFormOpen, closeForm }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [num_bedrooms, setNum_bedrooms] = useState("");
  const [num_bathrooms, setNum_bathrooms] = useState("");
  const [property_area, setProperty_area] = useState("");
  const [propertyType, setPropertyType] = useState("");


  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const broker_id = decoded.broker_id;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const property = {
      price,
      neighbourhood,
      city,
      province,
      country,
      num_bedrooms,
      num_bathrooms,
      property_area,
      listing_type: "sale",
      property_type: propertyType,
    };

    const data = {
      broker_id,
      title,
      property,
    };

    try {
      const response = await axios.post("http://localhost:8080/listing/property", data);

      if (response.status === 200) {
        alert("Property Added");
        console.log(response.data);
      } else {
        console.log("Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property", error);
    }
  };

  const inputRef = useRef();

  return (
    <div className={isFormOpen ? "show" : "hide"}>
      <form className="popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm} className="close-button">
          <img src={xIcon} alt="close" className="close-button-x" />
        </button>
        <h2>Add Property</h2>
        <input
          id="title"
          type="text"
          value={title}
          className="form-property-title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="form-pair">
          <input
            placeholder="Property Type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <input
            id="price"
            type="text"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-pair">
          <input
            id="neighbourhood"
            type="text"
            value={neighbourhood}
            placeholder="Neighbourhood"
            onChange={(e) => setNeighbourhood(e.target.value)}
            required
          />
          <input
            id="city"
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-pair">
          <input
            id="province"
            type="text"
            value={province}
            placeholder="Province"
            onChange={(e) => setProvince(e.target.value)}
            required
          />
          <input
            id="country"
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="form-pair">
          <input
            id="num_bedrooms"
            type="text"
            value={num_bedrooms}
            placeholder="Number of Bedrooms"
            onChange={(e) => setNum_bedrooms(e.target.value)}
            required
          />
          <input
            id="num_bathrooms"
            type="text"
            value={num_bathrooms}
            placeholder="Number of Bathrooms"
            onChange={(e) => setNum_bathrooms(e.target.value)}
            required
          />
        </div>
        <div className="form-pair">
          <input
            id="property_area"
            type="text"
            value={property_area}
            placeholder="Property Area"
            onChange={(e) => setProperty_area(e.target.value)}
            required
          />
          <select
            id="listingType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Select Listing Type</option>
            <option value="single-family">Single Family</option>
            <option value="duplex">Duplex</option>
            <option value="triplex">Triplex</option>
            <option value="quadruplex">Quadruplex</option>
            <option value="townhouse">Townhouse</option>
            <option value="studio">Studio</option>
            <option value="condominium">Condominium</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="button-container">
          <button type="submit" className="submit add">
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyAddForm;
