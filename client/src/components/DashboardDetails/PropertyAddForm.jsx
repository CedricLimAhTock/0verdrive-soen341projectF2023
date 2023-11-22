import React, { useState, useEffect } from "react";
import "./styles/PropertyAddForm.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import xIcon from "../../assets/xIcon.svg";
import xIconDark from "../../assets/xIcon_darkMode.svg";
import FormatNumber from "../FormatNumber/FormatNumber";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
const PropertyAddForm = ({ isFormOpen, closeForm }) => {
  const { darkMode } = React.useContext(DarkModeContext);
  const [title, setTitle] = useState("");

  const [civic_address, setCivicAddress] = useState("");
  const [apt_number, setAptNumber] = useState("");
  const [street, setStreet] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [listing_type, setListingType] = useState("sale");
  const [price, setPrice] = useState("");
  const [living_area, setLivingArea] = useState("");
  const [property_area, setPropertyArea] = useState("");
  const [num_bedrooms, setNumBedrooms] = useState("");
  const [num_bathrooms, setNumBathrooms] = useState("");
  const [num_floors, setNumFloors] = useState("");
  const [year_built, setYearBuilt] = useState("");
  const [property_type, setPropertyType] = useState("other");


  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const broker_id = decoded.broker_id;
  const handleSubmit = async (event) => {
    event.preventDefault();

    const currDate = new Date();
    const datetime = currDate.toISOString().split('T')[0];

    const propertyData = {
      active: 1,
      civic_address,
      apt_number,
      street,
      neighbourhood,
      city,
      province,
      postal_code,
      country,
      listing_type,
      price,
      living_area,
      property_area,
      num_bedrooms,
      num_bathrooms,
      num_floors,
      year_built,
      listed_date: datetime,
      property_type
    }

    
    try {
      const property = await axios.post("http://127.0.0.1:8080/property", propertyData);
      console.log(property);

      if (property.data.id) {
        const data = {
          broker_id: broker_id,
          title: title,
          property_id: property.data.id,
          description: ""
        };
  
        const response = await axios.post("http://127.0.0.1:8080/listing", data);
  
        if (response.status === 200) {
          alert('Property added');
        } else {
          console.log(response);
          console.log('Failed to add listing');
          axios.delete(`http://127.0.0.1:8080/${property.data.id}`);
        }
      } else {
        console.log('Failed to add property');
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={isFormOpen ? "show" : "hide"}>
      <form className="popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm} className="close-button">
          <img
            src={darkMode ? xIconDark : xIcon}
            alt="close"
            className="close-button-x"
          />
        </button>
        <h2>Add Property</h2>

        <div className="form-pair">
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="form-property-listing-type">
            <select
              name="listing_type"
              value={listing_type}
              onChange={(e) => setListingType(e.target.value)}
              required
            >
              <option className = "option" value="sale">For Sale ▾</option>
              <option className = "option" value="rent">For Rent ▾</option>
            </select>
          </div>
        </div>

        <div className="form-pair">
          <input
            placeholder="Civic Address"
            id="civic_address"
            value={civic_address}
            onChange={(e) => setCivicAddress(e.target.value)}
          />
          <input
            placeholder="Apt Number"
            id="apt_number"
            value={apt_number}
            onChange={(e) => setAptNumber(e.target.value)}
          />
        </div>

        <div className="form-pair">
          <input
            id="street"
            type="text"
            value={street}
            placeholder="Street"
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            id="neighbourhood"
            type="text"
            value={neighbourhood}
            placeholder="Neighbourhood"
            onChange={(e) => setNeighbourhood(e.target.value)}
          />
        </div>

        <div className="form-pair">
          <input
            id="city"
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            id="province"
            type="text"
            value={province}
            placeholder="Province"
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>

        <div className="form-pair">
          <input
            id="postal_code"
            type="text"
            value={postal_code}
            placeholder="Postal Code"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            id="country"
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="form-pair">
          <div className="form-property-property-type">
            <select
              name="property_type"
              value={property_type}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="other">Other ▾</option>
              <option value="single-family">Family ▾</option>
              <option value="duplex">Duplex ▾</option>
              <option value="triplex">Triplex ▾</option>
              <option value="quadruplex">Quadruplex ▾</option>
              <option value="townhouse">Townhouse ▾</option>
              <option value="studio">Studio ▾</option>
              <option value="condominium">Condominium ▾</option>
              </select>
          </div>
          <input
            id="price"
            type="number"
            min="0"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-pair">
          <input
            id="living_area"
            type="number"
            min="0"
            value={living_area}
            placeholder="Living Area"
            onChange={(e) => setLivingArea(e.target.value)}
          />
          <input
            id="property_area"
            type="number"
            min="0"
            value={property_area}
            placeholder="Property Area"
            onChange={(e) => setPropertyArea(e.target.value)}
          />
        </div>
        <div className="form-pair">
          <input
            id="num_bedrooms"
            type="number"
            min="0"
            max="10000"
            value={num_bedrooms}
            placeholder="Number of Bedrooms"
            onChange={(e) => setNumBedrooms(e.target.value)}
          />
          <input
            id="num_bathrooms"
            type="number"
            min="1"
            max="10000"
            value={num_bathrooms}
            placeholder="Number of Bathrooms"
            onChange={(e) => setNumBathrooms(e.target.value)}
          />
        </div>
        <div className="form-pair">
          <input
            id="num_floors"
            type="number"
            min="1"
            max="10000"
            value={num_floors}
            placeholder="Number of Floors"
            onChange={(e) => setNumFloors(e.target.value)}
          />
          <input
            id="year_built"
            type="date"
            min="1900-01-01"
            value={year_built}
            placeholder="Year Built"
            onChange={(e) => setYearBuilt(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="submit add">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyAddForm;
